package com.trendyolclone.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.couchbase.core.mapping.Document

@Document
data class Product(
    @Id val id: String? = null,
    val imageUrl: String,
    val brand: String,
    val name: String,
    val category: String,
    val eventKey: String,
    val reviewsCount: Int,
    val soldCount: Int,
    val rating: Double,
    val price: Double
)
