#!/bin/bash

FILE=/opt/neighbor_cats/*.jar
if [ -f "$FILE" ]; then
    rm -rf $FILE
fi