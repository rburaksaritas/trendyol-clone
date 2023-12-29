package com.trendyolclone.backend.controller

import com.trendyolclone.backend.model.Card
import com.trendyolclone.backend.service.CardService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.stereotype.*
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/cards")
class CardController(private val cardService: CardService) {

    private val logger = LoggerFactory.getLogger(CardController::class.java)

    @GetMapping
    fun getAllCards(): ResponseEntity<Iterable<Card>> {
        val cards = cardService.findAllCards()
        logger.info("getAllCards: returning ${cards.count()} cards")
        return ResponseEntity.ok(cards)
    }

    @GetMapping("/{id}")
    fun getCardById(@PathVariable id: String): ResponseEntity<Card> =
        cardService.findCardById(id)?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping
    fun createCard(@RequestBody card: Card): ResponseEntity<Card> =
        ResponseEntity.ok(cardService.createCard(card))

    @PutMapping("/{id}")
    fun updateCard(@PathVariable id: String, @RequestBody card: Card): ResponseEntity<Card> =
        try {
            ResponseEntity.ok(cardService.updateCard(id, card))
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }

    @DeleteMapping("/{id}")
    fun deleteCard(@PathVariable id: String): ResponseEntity<Void> =
        try {
            cardService.deleteCard(id)
            ResponseEntity<Void>(HttpStatus.NO_CONTENT)
        } catch (e: Exception) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
}
