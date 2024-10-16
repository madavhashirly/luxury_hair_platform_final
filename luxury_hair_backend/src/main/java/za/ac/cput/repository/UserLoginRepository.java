package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.UserLogin;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {

    UserLogin findByEmail(String email);


}
