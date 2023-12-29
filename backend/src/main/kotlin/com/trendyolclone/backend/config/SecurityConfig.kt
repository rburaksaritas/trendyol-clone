package com.trendyolclone.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfig {
    
    // @Bean
    // fun passwordEncoder(): PasswordEncoder {
    //     return BCryptPasswordEncoder()
    // }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf().disable()
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers("/cards/**").permitAll()
                    .anyRequest().authenticated()
            }
            .httpBasic()

        return http.build()
    }

    // override fun configure(auth: AuthenticationManagerBuilder) {
    //     val encoder = passwordEncoder()
    //     auth.inMemoryAuthentication()
    //         .withUser("admin")
    //         .password(encoder.encode("adminPassword")) // The password is BCrypt encoded
    //         .roles("ADMIN")
    // }
}
