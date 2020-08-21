package org.dnd3.udongsa.neighborcats.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class CustomExceptionResponse {
  
  private LocalDateTime timestamp;
  private HttpStatus httpStatus;
  private String message;
  private String description;
}