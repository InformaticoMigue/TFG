package org.iesbelen.wildzoo.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.iesbelen.wildzoo.model.User;
import org.iesbelen.wildzoo.repository.UserRepository;
import org.iesbelen.wildzoo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class JwtUtil {
    private Key secretKey;

    @Autowired
    private UserRepository userRepository;

    public JwtUtil() {
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

        public String generateToken(String username) {
            User user = userRepository.findByUsername(username);
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", user.getId());
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(username)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                    .signWith(secretKey)
                    .compact();
        }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String username) {
        final String usernameFromToken = extractUsername(token);
        return (username.equals(usernameFromToken) && !isTokenExpired(token));
    }
}
