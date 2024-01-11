package com.trendyolclone.backend.repository

import org.springframework.data.couchbase.repository.Collection
import org.springframework.data.repository.CrudRepository
import com.trendyolclone.backend.model.Product
import org.springframework.stereotype.Repository

@Repository
@Collection("products")
interface ProductRepository : CrudRepository<Product, String> {
    // define custom query methods if necessary
}
