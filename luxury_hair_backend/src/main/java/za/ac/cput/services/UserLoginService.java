package za.ac.cput.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.repository.UserLoginRepository;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class UserLoginService {
    private UserLoginRepository repo;
    @Autowired
    UserLoginService(UserLoginRepository repository){
        this.repo = repository;
    }

    public List<UserLogin> getall() {
        return repo.findAll();
    }

    public UserLogin create(UserLogin userLogin) {
        return repo.save(userLogin);
    }

    public UserLogin read(Long aLong) {
        return repo.findById(aLong).orElse(null);
    }

    public UserLogin update(UserLogin userLogin) {
        return repo.save(userLogin);
    }
    public UserLogin findByEmail(String email) {
        return repo.findByEmail(email);
    }
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Hashing algorithm not found", e);
        }
    }  public boolean checkEmailExists(String email) {
        UserLogin user = repo.findByEmail(email);
        return user != null;
    }

    public boolean validatePassword(String rawPassword, String hashedPassword) {
        return hashedPassword.equals(hashPassword(rawPassword));
    }

    public boolean authenticateUser(String email, String password) {
        UserLogin user = repo.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return true;
        } else {
            return false;
        }
    }


}