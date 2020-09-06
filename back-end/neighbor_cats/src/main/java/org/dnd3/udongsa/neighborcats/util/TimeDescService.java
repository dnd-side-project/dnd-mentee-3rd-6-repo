package org.dnd3.udongsa.neighborcats.util;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

@Component
public class TimeDescService {

	public String generate(LocalDateTime createdDateTime) {
    LocalDateTime now = LocalDateTime.now();
    int dayDiff = now.getDayOfMonth() - createdDateTime.getDayOfMonth();
    int hourDiff = now.getHour() - createdDateTime.getHour();
    int minuteDiff = now.getMinute() - createdDateTime.getMinute();
    int secondDiff = now.getSecond() - createdDateTime.getSecond();
    if(dayDiff >= 2){
      return dayDiff + " 일 전";
    }else if(dayDiff >= 1){
      return "어제";
    }else if(hourDiff >= 1){
      return hourDiff + " 시간 전";
    }else if(minuteDiff >= 1){
      return minuteDiff + " 분 전";
    }else if(secondDiff >= 0){
      return secondDiff + " 초 전";
    }else{
      return "-";
    }
	}
  
}