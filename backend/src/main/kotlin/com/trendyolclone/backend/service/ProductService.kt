package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.Product
import com.trendyolclone.backend.repository.ProductRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun findAllProducts(): Iterable<Product> {
        return productRepository.findAll()
    }

    fun findProductById(id: String): Product? = productRepository.findById(id).orElse(null)

    fun createProduct(product: Product): Product {
        val productWithId = if (product.id == null) {
            product.copy(id = UUID.randomUUID().toString())
        } else {
            product
        }
        return productRepository.save(productWithId)
    }

    fun updateProduct(id: String, product: Product): Product {
        if (!productRepository.existsById(id)) {
            throw Exception("Product with ID $id not found")
        }
        return productRepository.save(product.copy(id = id))
    }

    fun deleteProduct(id: String) {
        if (!productRepository.existsById(id)) {
            throw Exception("Product with ID $id not found")
        }
        productRepository.deleteById(id)
    }
}
