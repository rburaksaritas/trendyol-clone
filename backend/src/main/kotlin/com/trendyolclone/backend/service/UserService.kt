package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.User
import com.trendyolclone.backend.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserService(private val userRepository: UserRepository) {

    fun findAllUsers(): Iterable<User> = userRepository.findAll()

    fun findUserById(id: String): User? = userRepository.findById(id).orElse(null)

    fun createUser(user: User): User {
        val userWithId = if (user.id == null) {
            user.copy(id = UUID.randomUUID().toString())
        } else {
            user
        }
        return userRepository.save(userWithId)
    }

    fun updateUser(id: String, user: User): User {
        if (!userRepository.existsById(id)) {
            throw Exception("User with ID $id not found")
        }
        return userRepository.save(user.copy(id = id))
    }

    fun deleteUser(id: String) {
        if (!userRepository.existsById(id)) {
            throw Exception("User with ID $id not found")
        }
        userRepository.deleteById(id)
    }
}
