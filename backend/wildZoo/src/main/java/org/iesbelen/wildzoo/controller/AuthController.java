package org.iesbelen.wildzoo.controller;

import org.iesbelen.wildzoo.jwt.JwtUtil;
import org.iesbelen.wildzoo.model.AuthenticationRequestModel;
import org.iesbelen.wildzoo.model.AuthenticationResponseModel;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthController {
    private final JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequestModel authenticationRequest) {
        User user = userService.authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        final String jwt = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(new AuthenticationResponseModel(jwt));
    }
}

