package org.dnd3.udongsa.neighborcats.servant.entity;

import java.time.LocalDateTime;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.dnd3.udongsa.neighborcats.address.Address;
import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.imgfile.ImgFile;
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
  @Column(unique = true)
	private String email;
	
	@NotBlank
	@Size(max = 120)
	private String password;

  @Size(max = 20)
  @Column(unique = true)
	private String nickname;
	
	private String phoneNumber;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "servant_roles", 
				joinColumns = @JoinColumn(name = "servant_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@NotNull
  private Boolean isServant;

  @NotNull
  @ManyToOne
  @JoinColumn
  private Address address;

  @OneToOne
  @JoinColumn
  private ImgFile profileImg;
  
  @CreationTimestamp
  private LocalDateTime createdAt;

  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "servant")
  private final List<Cat> cats = new ArrayList<>();

  protected static Servant of(String name, String email, String password, String phoneNumber, Boolean isServant, String nickName, Role role, Address address, ImgFile profileImg){
    Servant servant = new Servant();
    servant.id = 0L;
    servant.name = name;
		servant.email = email;
		servant.password = password;
		servant.phoneNumber = phoneNumber;
    servant.isServant = isServant;
    servant.nickname = nickName;
    if(Objects.nonNull(role)) servant.addRole(role);
    servant.address = address;
    servant.profileImg = profileImg;
    return servant;
  }

	public void addRole(Role role) {
		this.roles.add(role);
  }
  
  public void updateAddress(Address address){
    this.address = address;
  }

  /**
   * ImgFile 연관관계를 제거한다.
   * @return 연관된 ImgFile 
   */
  public ImgFile detachProfileImg(){
    ImgFile imgFile = this.profileImg;
    this.profileImg = null;
    return imgFile;
  }

  public boolean attachProfileImg(ImgFile imgFile){
    this.profileImg = imgFile;
    return true;
  }
	
}