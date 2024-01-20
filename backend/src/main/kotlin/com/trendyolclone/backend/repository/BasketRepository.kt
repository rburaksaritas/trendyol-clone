package com.trendyolclone.backend.repository

import org.springframework.data.couchbase.repository.Collection;
import com.trendyolclone.backend.model.Basket
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
@Collection("baskets")
interface BasketRepository : CrudRepository<Basket, String> {
    fun findByUserId(userId: String): Basket?
}
