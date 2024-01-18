package com.trendyolclone.backend.controller

import com.trendyolclone.backend.service.AuthenticationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthenticationController(private val authenticationService: AuthenticationService) {

    @PostMapping("/register")
    fun registerUser(@RequestBody user: Map<String, String>): ResponseEntity<Any> {
        val username = user["username"]
        val password = user["password"]
        val email = user["email"]

        if (username == null || password == null || email == null) {
            return ResponseEntity.badRequest().body("Username, password, and email must be provided")
        }

        return try {
            val newUser = authenticationService.registerUser(username, password, email)
            ResponseEntity.ok(newUser)
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/login")
    fun loginUser(@RequestBody loginDetails: Map<String, String>): ResponseEntity<Any> {
        val username = loginDetails["username"]
        val password = loginDetails["password"]

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided")
        }

        val token = authenticationService.login(username, password)
        return if (token != null) {
            ResponseEntity.ok().body(mapOf("token" to token))
        } else {
            ResponseEntity.status(401).body("Invalid username or password")
        }
    }
}
