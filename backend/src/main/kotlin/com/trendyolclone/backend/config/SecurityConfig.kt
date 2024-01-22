package com.trendyolclone.backend.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.http.HttpMethod
import com.trendyolclone.backend.service.CustomUserDetailsService


@Configuration
@EnableWebSecurity
class SecurityConfig(private val customUserDetailsService: CustomUserDetailsService) {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors().and().csrf().disable()
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(HttpMethod.POST, "/cards/**", "/products/**", "/favorites/**", "/basket/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/cards/**", "/products/**", "/favorites/**", "/basket/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/cards/**", "/products/**", "/favorites/**", "/basket/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/favorites/**", "/basket/**").hasRole("USER")
                    .requestMatchers(HttpMethod.PUT, "/favorites/**", "/basket/**").hasRole("USER")
                    .requestMatchers(HttpMethod.DELETE, "/favorites/**", "/basket/**").hasRole("USER")
                    .anyRequest().permitAll()
            }
            .httpBasic()

        return http.build()
    }

    @Override
    fun configure(auth: AuthenticationManagerBuilder) {
        auth
            .userDetailsService(customUserDetailsService)
            .passwordEncoder(passwordEncoder())
    }

}
