package com.trendyolclone.backend.model

import org.springframework.data.annotation.Id
import org.springframework.data.couchbase.core.mapping.Document

@Document
data class Basket(
    @Id val id: String? = null,
    val userId: String,
    val items: MutableList<Item>
) {
    data class Item(
        val productId: String,
        var quantity: Int,
        var isActive: Boolean
    )
}
