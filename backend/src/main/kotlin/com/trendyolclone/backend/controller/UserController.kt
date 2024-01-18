package com.trendyolclone.backend.controller

import com.trendyolclone.backend.model.User
import com.trendyolclone.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getAllUsers(): ResponseEntity<Iterable<User>> =
        ResponseEntity.ok(userService.findAllUsers())

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: String): ResponseEntity<User> =
        userService.findUserById(id)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @GetMapping("/username/{username}")
    fun getUserByUsername(@PathVariable username: String): ResponseEntity<User> =
        userService.findUserByUsername(username)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping
    fun createUser(@RequestBody user: User): ResponseEntity<User> =
        ResponseEntity.ok(userService.createUser(user))

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody user: User): ResponseEntity<User> =
        try {
            ResponseEntity.ok(userService.updateUser(id, user))
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<Void> =
        try {
            userService.deleteUser(id)
            ResponseEntity<Void>(HttpStatus.NO_CONTENT)
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }

    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ResponseEntity<String> {
        return ResponseEntity(e.message, HttpStatus.BAD_REQUEST)
    }
}
