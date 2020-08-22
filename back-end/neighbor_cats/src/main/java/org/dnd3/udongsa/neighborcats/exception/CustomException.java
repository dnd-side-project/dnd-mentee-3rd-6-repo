package org.dnd3.udongsa.neighborcats.exception;

import org.apache.logging.log4j.message.ParameterizedMessage;
import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomException extends RuntimeException{

  private static final long serialVersionUID = 1L;

  private HttpStatus httpStatus;
  private String message;
  private String description;

  public CustomException(HttpStatus httpStatus, String message, String descriptionPattern, Object... descArgs){
    this.httpStatus = httpStatus;
    this.message = message;
    this.description = ParameterizedMessage.format(descriptionPattern, descArgs);
  }

  public CustomException(HttpStatus httpStatus, String message){
    this.httpStatus = httpStatus;
    this.message = message;
    this.description = "No Description";
  }
  
}