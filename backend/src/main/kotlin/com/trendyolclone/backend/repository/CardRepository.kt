package com.trendyolclone.backend.repository

import org.springframework.data.couchbase.repository.Collection;
import org.springframework.data.couchbase.repository.CouchbaseRepository;
import com.trendyolclone.backend.model.Card
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
@Collection("cards")
interface CardRepository : CrudRepository<Card, String> {
    // define custom query methods if necessary
}
