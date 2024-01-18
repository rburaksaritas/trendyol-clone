package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.User
import com.trendyolclone.backend.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserService(private val userRepository: UserRepository, private val passwordEncoder: PasswordEncoder) {

    fun findAllUsers(): Iterable<User> = userRepository.findAll()

    fun findUserById(id: String): User? = userRepository.findById(id).orElse(null)

    fun findUserByUsername(username: String): User? = userRepository.findByUsername(username)

    fun createUser(user: User): User {
        if (userRepository.findByUsername(user.username) != null) {
            throw Exception("Username '${user.username}' is already taken")
        }
    
        if (userRepository.findByEmail(user.email) != null) {
            throw Exception("Email '${user.email}' is already in use")
        }
    
        val encryptedPassword = passwordEncoder.encode(user.password)
        val userWithEncryptedPassword = user.copy(password = encryptedPassword, id = UUID.randomUUID().toString())
    
        return userRepository.save(userWithEncryptedPassword)
    }
    
    fun updateUser(id: String, user: User): User {
        val existingUser = userRepository.findById(id).orElse(null)
            ?: throw Exception("User with ID $id not found")
    
        if (user.username != existingUser.username && userRepository.findByUsername(user.username) != null) {
            throw Exception("Username '${user.username}' is already taken")
        }
    
        if (user.email != existingUser.email && userRepository.findByEmail(user.email) != null) {
            throw Exception("Email '${user.email}' is already in use")
        }
    
        val updatedUser = if (user.password != existingUser.password) {
            user.copy(password = passwordEncoder.encode(user.password))
        } else {
            user
        }
    
        return userRepository.save(updatedUser.copy(id = id))
    }
    

    fun deleteUser(id: String) {
        if (!userRepository.existsById(id)) {
            throw Exception("User with ID $id not found")
        }
        userRepository.deleteById(id)
    }
}
