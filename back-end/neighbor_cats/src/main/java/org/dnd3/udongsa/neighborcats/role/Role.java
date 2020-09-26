package org.dnd3.udongsa.neighborcats.role;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Role {
  
  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
  private ERole name;
  
  public static Role of(ERole eRole){
    Role role = new Role();
    role.id = 0L;
    role.name = eRole;
    return role;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Role role = (Role) o;
    return Objects.equals(id, role.id) &&
      name == role.name;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }
}