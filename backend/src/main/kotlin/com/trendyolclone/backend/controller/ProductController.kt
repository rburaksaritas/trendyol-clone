package com.trendyolclone.backend.controller

import com.trendyolclone.backend.model.Product
import com.trendyolclone.backend.service.ProductService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService) {

    @GetMapping
    fun getAllProducts(): ResponseEntity<Iterable<Product>> {
        val products = productService.findAllProducts()
        return ResponseEntity.ok(products)
    }

    @GetMapping("/search")
    fun getProductsDynamically(
        @RequestParam allParams: Map<String, String>,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam sortBy: String?,
        @RequestParam(defaultValue = "ASC") direction: Sort.Direction,
        @RequestParam(required = false) searchQuery: String?
    ): ResponseEntity<List<Product>> {
        val criteria = allParams - setOf("page", "size", "sortBy", "direction")
        val products = productService.findProducts(criteria, page, size, sortBy, direction, searchQuery)
        return ResponseEntity.ok(products)
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: String): ResponseEntity<Product> =
        productService.findProductById(id)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping
    fun createProduct(@RequestBody product: Product): ResponseEntity<Product> =
        ResponseEntity.ok(productService.createProduct(product))

    @PutMapping("/{id}")
    fun updateProduct(@PathVariable id: String, @RequestBody product: Product): ResponseEntity<Product> =
        try {
            ResponseEntity.ok(productService.updateProduct(id, product))
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }

    @DeleteMapping("/{id}")
    fun deleteProduct(@PathVariable id: String): ResponseEntity<Void> =
        try {
            productService.deleteProduct(id)
            ResponseEntity<Void>(HttpStatus.NO_CONTENT)
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
}
