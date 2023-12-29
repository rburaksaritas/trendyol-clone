package com.trendyolclone.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.couchbase.core.mapping.Document

@Document
data class Card(
    @Id val id: String? = null, // Assuming the ID will be managed by Couchbase
    val imageUrl: String,
    val title: String,
    val category: String,
    val search: String
)
