package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.Basket
import com.trendyolclone.backend.repository.BasketRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BasketService(private val basketRepository: BasketRepository) {

    fun findBasketByUserId(userId: String): Basket? =
        basketRepository.findByUserId(userId)

    fun addToBasket(userId: String, productId: String, quantity: Int): Basket {
        val basket = findBasketByUserId(userId) ?: Basket(id = UUID.randomUUID().toString(), userId = userId, items = mutableListOf())
        basket.items.find { it.productId == productId }?.let {
            it.quantity += quantity
        } ?: basket.items.add(Basket.Item(productId, quantity, isActive = true))
        return basketRepository.save(basket)
    }

    fun removeFromBasket(userId: String, productId: String): Basket? {
        val basket = findBasketByUserId(userId)
        basket?.items?.removeIf { it.productId == productId }
        return basket?.let { basketRepository.save(it) }
    }

    fun updateBasketItem(userId: String, productId: String, quantity: Int, isActive: Boolean): Basket? {
        val basket = findBasketByUserId(userId)
        basket?.let {
            if (quantity < 1) {
                it.items.removeIf { item -> item.productId == productId }
            } else {
                it.items.find { item -> item.productId == productId }?.let { item ->
                    item.quantity = quantity
                    item.isActive = isActive
                }
            }
            return basketRepository.save(it)
        }
        return null 
    }
    

    fun clearBasket(userId: String): Basket? {
        val basket = findBasketByUserId(userId)
        basket?.items?.clear()
        return basket?.let { basketRepository.save(it) }
    }
}
