package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.Favorite
import com.trendyolclone.backend.repository.FavoriteRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class FavoriteService(private val favoriteRepository: FavoriteRepository) {

    fun findFavoritesByUserId(userId: String): Favorite? = favoriteRepository.findByUserId(userId)

    fun createOrUpdateFavorites(userId: String, productId: String): Favorite {
        // Check if there's an existing favorite record for the given userId
        val existingFavorite = favoriteRepository.findByUserId(userId)

        return if (existingFavorite != null) {
            // If the product ID is already in the list, don't add it again
            if (existingFavorite.productIds.contains(productId)) {
                existingFavorite
            } else {
                // Add the new product ID to the existing list
                val updatedFavorite = existingFavorite.copy(productIds = existingFavorite.productIds + productId)
                favoriteRepository.save(updatedFavorite)
            }
        } else {
            // If no record exists, create a new one with a generated ID
            val newFavorite = Favorite(id = UUID.randomUUID().toString(), userId = userId, productIds = listOf(productId))
            favoriteRepository.save(newFavorite)
        }
    }

    fun deleteFavorites(userId: String) {
        favoriteRepository.findByUserId(userId)?.let {
            favoriteRepository.deleteById(it.id!!)
        }
    }

    fun removeFavoriteProduct(userId: String, productId: String): Favorite? {
        val existingFavorite = favoriteRepository.findByUserId(userId)
        return existingFavorite?.let {
            println("Existing product IDs: ${it.productIds}")
            println("Type of stored product IDs: ${it.productIds.firstOrNull()?.javaClass?.name}")
            println("Incoming product ID: $productId")
            println("Type of incoming product ID: ${productId.javaClass.name}")
            if (it.productIds.contains(productId)) {
                val updatedFavorite = it.copy(productIds = it.productIds - productId)
                println("Removing product ID: $productId") // Log the removal action
                val savedFavorite = favoriteRepository.save(updatedFavorite)
                println("Updated product IDs: ${savedFavorite.productIds}") // Log updated product IDs
                savedFavorite
            } else {
                println("Product ID $productId not found in favorites") // Log if product ID not found
                it
            }
        }
    }
    
}
