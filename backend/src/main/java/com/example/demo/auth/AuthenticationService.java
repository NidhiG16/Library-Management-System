package com.example.demo.auth;

import com.example.demo.User.Role;
import com.example.demo.User.User;
import com.example.demo.User.UserRepository;
import com.example.demo.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager manager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            return new AuthenticationResponse("User with this email already exists");
        }

        User user = new User(
                request.getFirstname(),
                request.getLastname(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()), // Set a non-empty password
                Role.USER
        );
        repository.save(user);
        return new AuthenticationResponse("User created successfully");

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            // Handle authentication failure (user not found or password mismatch)
            return new AuthenticationResponse("Email or passowrd mismatch");
        }
        var user =  repository
                .findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
}
