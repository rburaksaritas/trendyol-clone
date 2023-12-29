package com.trendyolclone.backend.config

import org.springframework.context.annotation.Configuration
import org.springframework.data.couchbase.config.AbstractCouchbaseConfiguration
import org.slf4j.LoggerFactory

@Configuration
class CouchbaseConfig : AbstractCouchbaseConfiguration() {

    private val logger = LoggerFactory.getLogger(CouchbaseConfig::class.java)

    override fun getConnectionString(): String {
        val connectionString = "couchbase://database"
        logger.info("Couchbase connection string: $connectionString")
        return connectionString
    }

    override fun getUserName(): String {
        return "tyadmin"
    }

    override fun getPassword(): String {
        return "typassword"
    }

    override fun getBucketName(): String {
        return "database"
    }

    // Additional configurations (if necessary)
}
