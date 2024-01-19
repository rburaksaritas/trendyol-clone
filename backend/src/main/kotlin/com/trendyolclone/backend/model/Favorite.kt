package com.trendyolclone.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.couchbase.core.mapping.Document

@Document
data class Favorite(
    @Id val id: String? = null,
    val userId: String,
    val productIds: List<String>
)
