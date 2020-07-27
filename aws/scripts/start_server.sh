#!/bin/bash

REPOSITORY=/root/repository/neighbor_cats
DEPLOY_DIR=/opt/neighbor_cats

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f neighbor_cats)

echo "$CURRENT_PID"

if [ -z $CURRENT_PID ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> 새 어플리케이션 배포"

echo "> Build 파일 복사"

mkdir -p $DEPLOY_DIR
cp $REPOSITORY/*.jar $DEPLOY_DIR/

JAR_NAME=$(ls $DEPLOY_DIR |grep 'neighbor_cats' | tail -n 1)

echo "> JAR Name: $JAR_NAME"

nohup java -jar $DEPLOY_DIR/$JAR_NAME --spring.profiles.active=prod > $DEPLOY_DIR/app.log 2>&1 &

echo ">Started Server"



