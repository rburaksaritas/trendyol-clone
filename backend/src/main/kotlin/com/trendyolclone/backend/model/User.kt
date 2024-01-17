package com.trendyolclone.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.couchbase.core.mapping.Document

@Document
data class User(
    @Id val id: String? = null,
    val username: String,
    val password: String,
    val email: String,
    val roles: List<String>
)
