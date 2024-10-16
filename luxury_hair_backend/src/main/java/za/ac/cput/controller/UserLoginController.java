package za.ac.cput.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.UserLogin;
import za.ac.cput.services.UserLoginService;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/userlogin")
@CrossOrigin(origins = "http://localhost:5173")

public class UserLoginController {
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/create")
    public UserLogin createUser(@RequestBody UserLogin request) {
        return userLoginService.create(request);
    }


    @PostMapping("/read")
    public ResponseEntity<?> loginUser(@RequestBody UserLogin loginDetails) {
        try {
            // Authenticate the user by checking the email and password
            boolean isAuthenticated = userLoginService.authenticateUser(loginDetails.getEmail(), loginDetails.getPassword());

            if (isAuthenticated) {
                // Retrieve the UserLogin details (including the userId) based on email
                UserLogin user = userLoginService.findByEmail(loginDetails.getEmail());

                if (user != null) {
                    // Return the userId along with the success message
                    return ResponseEntity.ok("Login successful! UserId: " + user.getUserId());
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login. Please try again.");
        }
    }

    @GetMapping("/email-exists")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@RequestParam String email) {
        boolean exists = userLoginService.checkEmailExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public UserLogin update(@RequestBody UserLogin userLogin){
        return userLoginService.update(userLogin);
    }

}