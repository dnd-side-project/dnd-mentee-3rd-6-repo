// package org.dnd3.udongsa.neighborcats.role;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.transaction.annotation.Transactional;

// @ActiveProfiles("dev")
// @SpringBootTest
// @Transactional
// @Rollback
// public class RoleRepoTest {

//   @Autowired
//   private RoleRepository roleRepo;

//   @Test
//   public void saveRole(){
//     Role role = new Role();
//     role.setName(ERole.ROLE_MODERATOR);
//     roleRepo.save(role);

//     Role persist = roleRepo.findByName(ERole.ROLE_MODERATOR).get();
//     assertEquals(ERole.ROLE_MODERATOR, persist.getName());
//   }
  
// }