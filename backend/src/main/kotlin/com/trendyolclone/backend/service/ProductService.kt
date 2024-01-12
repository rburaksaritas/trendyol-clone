package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.Product
import com.trendyolclone.backend.repository.ProductRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.UUID
import kotlin.reflect.full.memberProperties

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun findAllProducts(): Iterable<Product> {
        return productRepository.findAll()
    }

    fun findProductById(id: String): Product? = productRepository.findById(id).orElse(null)

    private fun getComparator(sortBy: String?, direction: Sort.Direction): Comparator<Product> {
        val property = Product::class.memberProperties
            .firstOrNull { it.name.equals(sortBy, ignoreCase = true) }
            ?: Product::id // default sort property

        return Comparator { p1, p2 ->
            val value1 = property.get(p1) as Comparable<Any>
            val value2 = property.get(p2) as Comparable<Any>
            if (direction == Sort.Direction.ASC) value1.compareTo(value2)
            else value2.compareTo(value1)
        }
    }

    private fun matchesCriteria(product: Product, criteria: Map<String, String>): Boolean {
        // If no criteria are provided, return true to include all products
        if (criteria.isEmpty()) {
            return true;
        } 
    
        // Reflectively check if product fields match the criteria
        return criteria.all { (key, value) ->
            Product::class.memberProperties
                .firstOrNull { it.name.equals(key, ignoreCase = true) }
                ?.get(product)
                ?.toString()
                ?.contains(value, ignoreCase = true) ?: false
        }
    }

    private fun matchesSearchQuery(product: Product, searchQuery: String): Boolean {
        val searchTerms = searchQuery.split("\\s+".toRegex())
        return searchTerms.all { term ->
            product.name.contains(term, ignoreCase = true) ||
            product.brand.contains(term, ignoreCase = true)
        }
    }

    fun findProducts(criteria: Map<String, String>, page: Int, size: Int, sortBy: String?, direction: Sort.Direction, searchQuery: String?): List<Product> {
        val products = productRepository.findAll().toList()

        val filteredProducts = if (!searchQuery.isNullOrEmpty()) {
            products.filter { matchesSearchQuery(it, searchQuery) }
        } else {
            products.filter { matchesCriteria(it, criteria) }
        }

        val sortedProducts = filteredProducts.sortedWith(getComparator(sortBy, direction))
        return sortedProducts.drop(page * size).take(size)
    }

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
