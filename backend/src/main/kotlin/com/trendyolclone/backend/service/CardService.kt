package com.trendyolclone.backend.service

import com.trendyolclone.backend.model.Card
import com.trendyolclone.backend.repository.CardRepository
import org.springframework.stereotype.Service
import org.slf4j.LoggerFactory
import java.util.UUID

@Service
class CardService(private val cardRepository: CardRepository) {

    private val logger = LoggerFactory.getLogger(CardService::class.java)
    
    fun findAllCards(): Iterable<Card> {
        val cards = cardRepository.findAll()
        logger.info("findAllCards: found ${cards.count()} cards")
        return cards
    }

    fun findCardById(id: String): Card? = cardRepository.findById(id).orElse(null)

    fun createCard(card: Card): Card {
        val cardWithId = if (card.id == null) {
            card.copy(id = UUID.randomUUID().toString())
        } else {
            card
        }
        return cardRepository.save(cardWithId)
    }

    fun updateCard(id: String, card: Card): Card {
        if (!cardRepository.existsById(id)) {
            throw Exception("Card with ID $id not found")
        }
        return cardRepository.save(card.copy(id = id))
    }

    fun deleteCard(id: String) {
        if (!cardRepository.existsById(id)) {
            throw Exception("Card with ID $id not found")
        }
        cardRepository.deleteById(id)
    }
}
