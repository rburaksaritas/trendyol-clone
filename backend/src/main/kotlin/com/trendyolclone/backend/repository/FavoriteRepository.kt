package com.trendyolclone.backend.repository

import org.springframework.data.couchbase.repository.Collection
import com.trendyolclone.backend.model.Favorite
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
@Collection("favorites")
interface FavoriteRepository : CrudRepository<Favorite, String> {
    fun findByUserId(userId: String): Favorite?
}
