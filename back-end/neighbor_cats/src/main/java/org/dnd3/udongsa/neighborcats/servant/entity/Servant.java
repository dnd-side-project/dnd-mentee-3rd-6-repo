package org.dnd3.udongsa.neighborcats.servant.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.dnd3.udongsa.neighborcats.role.Role;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @NoArgsConstructor
public class Servant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 20)
	private String name;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	
	@NotBlank
	@Size(max = 120)
	private String password;
	
	@Size(max = 20)
	private String nickname;
	
	// 우편번호
  private String postcode;
  
  private String address;
	
	private String phoneNumber;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "servant_roles", 
				joinColumns = @JoinColumn(name = "servant_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@NotNull
  private Boolean isServant;
  
  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;
	
	protected Servant(String name, String email, String password, String phoneNumber, Boolean isServant, String nickName, String address){
		this.name = name;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
    this.isServant = isServant;
    this.nickname = nickName;
    this.address = address;
	}

	public void addRole(Role role) {
		this.roles.add(role);
	}
	
}