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
                    .requestMatchers(HttpMethod.POST, "/cards/**", "/products/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/cards/**", "/products/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/cards/**", "/products/**").hasRole("ADMIN")
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
