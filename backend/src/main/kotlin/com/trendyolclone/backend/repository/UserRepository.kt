package com.trendyolclone.backend.repository

import org.springframework.data.couchbase.repository.Collection
import com.trendyolclone.backend.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
@Collection("users")
interface UserRepository : CrudRepository<User, String> {
    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
}
