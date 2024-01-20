package com.trendyolclone.backend.controller

import com.trendyolclone.backend.model.Basket
import com.trendyolclone.backend.service.BasketService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/basket")
class BasketController(private val basketService: BasketService) {

    @GetMapping("/{userId}")
    fun getBasketByUserId(@PathVariable userId: String): ResponseEntity<Basket> =
        basketService.findBasketByUserId(userId)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()

    @PostMapping("/{userId}")
    fun addToBasket(@PathVariable userId: String, @RequestBody basketItem: Map<String, Any>): ResponseEntity<Basket> {
        val productId = basketItem["productId"] as String
        val quantity = (basketItem["quantity"] as Number).toInt()
        return ResponseEntity.ok(basketService.addToBasket(userId, productId, quantity))
    }
        
    @DeleteMapping("/{userId}/{productId}")
    fun removeFromBasket(@PathVariable userId: String, @PathVariable productId: String): ResponseEntity<Basket> =
        basketService.removeFromBasket(userId, productId)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()

    @PutMapping("/{userId}/{productId}")
    fun updateBasketItem(@PathVariable userId: String, @PathVariable productId: String, @RequestParam quantity: Int, @RequestParam isActive: Boolean): ResponseEntity<Basket> =
        basketService.updateBasketItem(userId, productId, quantity, isActive)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()

    @PostMapping("/clear/{userId}")
    fun clearBasket(@PathVariable userId: String): ResponseEntity<Basket> =
        basketService.clearBasket(userId)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
}
