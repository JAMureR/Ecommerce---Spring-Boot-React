package com.bc.backend_tienda.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bc.backend_tienda.demo.model.User;
import com.bc.backend_tienda.demo.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // React Vite
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Registro
    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if(userRepository.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email ya registrado");
            return response;
        }

        // NOTA: por seguridad real, se debe hashear la contraseña (BCrypt)
        User savedUser = userRepository.save(user);
        response.put("success", true);
        response.put("user", savedUser);
        return response;
    }

    // Login
    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> loginData) {
        Map<String, Object> response = new HashMap<>();

        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if(userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            // Simulamos JWT
            String token = "fake-jwt-token-for-user-" + user.getId();

            response.put("success", true);
            response.put("user", user);
            response.put("token", token);
            return response;
        } else {
            response.put("success", false);
            response.put("message", "Email o contraseña incorrectos");
            return response;
        }
    }
}
