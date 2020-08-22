package org.dnd3.udongsa.neighborcats.exception;

import java.time.LocalDateTime;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler{

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<Object> global(CustomException ex){
    CustomExceptionResponse response = new CustomExceptionResponse(LocalDateTime.now(), 
                                                                    ex.getHttpStatus(), 
                                                                    ex.getMessage(), 
                                                                    ex.getDescription());
    ex.printStackTrace();
    return ResponseEntity.status(ex.getHttpStatus()).body(response);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> global(Exception ex){
    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    CustomExceptionResponse response = new CustomExceptionResponse(LocalDateTime.now(), 
                                                                    httpStatus, 
                                                                    ex.getMessage(), 
                                                                    ExceptionUtils.getStackTrace(ex));
    ex.printStackTrace();
    return ResponseEntity.status(httpStatus).body(response);
  }

  
}