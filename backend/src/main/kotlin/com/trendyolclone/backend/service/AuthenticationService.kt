package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.User
import com.trendyolclone.backend.repository.UserRepository
import com.trendyolclone.backend.service.UserService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.Base64

@Service
class AuthenticationService(private val userRepository: UserRepository, private val passwordEncoder: PasswordEncoder, private val userService: UserService) {

    fun registerUser(username: String, password: String, email: String): User {
        userService.findUserByUsername(username)?.let {
            throw Exception("Username '$username' is already taken")
        }
        
        val newUser = User(
            username = username,
            password = password,
            email = email,
            roles = listOf("ROLE_USER")
        )

        return userService.createUser(newUser)
    }

    fun checkPassword(rawPassword: String, encodedPassword: String): Boolean {
        return passwordEncoder.matches(rawPassword, encodedPassword)
    }

    fun login(username: String, password: String): String? {
        val user = userService.findUserByUsername(username)
        if (user != null && checkPassword(password, user.password)) {
            return Base64.getEncoder().encodeToString("$username:$password".toByteArray())
        }
        return null
    }
}
