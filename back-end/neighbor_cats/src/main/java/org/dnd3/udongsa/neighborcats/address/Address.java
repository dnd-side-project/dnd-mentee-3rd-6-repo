package org.dnd3.udongsa.neighborcats.address;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import org.springframework.util.StringUtils;

import lombok.Getter;

@Entity
@Getter
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String depth1;
  @NotBlank
  private String depth2;
  @NotBlank
  private String depth3;
  private String depth4;

  public static Address of(String depth1, String depth2, String depth3, String depth4){
    Address address = new Address();
    address.depth1 = depth1;
    address.depth2 = depth2;
    address.depth3 = depth3;
    address.depth4 = depth4;
    return address;
  }

  public String getName(){
    if(Objects.isNull(depth4) || StringUtils.isEmpty(depth4)) 
      return depth1 + " " + depth2 + " " + depth3;
    return depth1 + " " + depth2 + " " + depth3 + " " + depth4;
  }
  
}