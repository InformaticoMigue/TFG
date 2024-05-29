package org.iesbelen.wildzoo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors(cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(List.of("http://localhost:4200")); // Asegúrate de incluir aquí el origen correcto
                            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                            config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
                            config.setAllowCredentials(true);
                            return config;
                        }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/authenticate", "/**").permitAll()  // Permite acceso sin autenticación a '/authenticate' y cualquier ruta bajo '/public/'
                        .anyRequest().authenticated())  // Todas las demás rutas requieren autenticación
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // No se utilizan sesiones para almacenar el estado del usuario
                .httpBasic().disable();

        return http.build();
    }
}
