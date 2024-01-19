package com.trendyolclone.backend.controller

import com.trendyolclone.backend.model.Favorite
import com.trendyolclone.backend.service.FavoriteService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/favorites")
class FavoriteController(private val favoriteService: FavoriteService) {

    @GetMapping("/{userId}")
    fun getFavoritesByUserId(@PathVariable userId: String): ResponseEntity<Favorite> =
        favoriteService.findFavoritesByUserId(userId)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()

    @PostMapping("/{userId}")
    fun addFavoriteProduct(@PathVariable userId: String, @RequestBody productId: String): ResponseEntity<Favorite> {
        val updatedFavorite = favoriteService.createOrUpdateFavorites(userId, productId)
        return ResponseEntity.ok(updatedFavorite)
    }

    @DeleteMapping("/{userId}")
    fun deleteFavorites(@PathVariable userId: String): ResponseEntity<Void> {
        favoriteService.deleteFavorites(userId)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/{userId}/{productId}")
    fun removeFavoriteProduct(@PathVariable userId: String, @PathVariable productId: String): ResponseEntity<Favorite> =
        favoriteService.removeFavoriteProduct(userId, productId)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
}
