'use strict';

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.displayName = `${value}-${suit}`;
    this.fullName = this.setFullName(suit, value);
    this.numValue = this.setNumValue(value);
  }

  setFullName(suit, value) {
    return `${this.fullValue(value)} of ${this.fullSuit(suit)}`;
  }

  fullSuit(suit) {
    if (suit === 'D') {
      return 'Diamonds';
    } else if (suit === 'C') {
      return 'Clubs';
    } else if (suit === 'H') {
      return 'Hearts';
    } else {
      return 'Spades';
    }
  }

  fullValue(value) {
    if (value === 'J') {
      return 'Jack';
    } else if (value === 'Q') {
      return 'Queen';
    } else if (value === 'K') {
      return 'King';
    } else if (value === 'A') {
      return 'Ace';
    } else {
      return value;
    }
  }

  setNumValue(value) {
    if (value === 'J') {
      return 11;
    } else if (value === 'Q') {
      return 12;
    } else if (value === 'K') {
      return 13;
    } else if (value === 'A') {
      return 14;
    } else {
      return Number(value);
    }
  }
}

class Deck {
  // creates a new 52 card deck, shuffled
  constructor() {
    this.suits = ['S', 'C', 'H', 'D'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cards = [];
    this.suits.forEach(suit => {
      this.values.forEach(value => {
        const card = new Card(suit, value);
        this.cards.push(card);
      });
    });
  }
}

class Stack {
  constructor(store=[]) {
    this.store = store;
  }

  length() {
    return this.store.length;
  }

  draw() {
    return this.store.pop();
  }

  shuffle() {
    let currentIndex = this.store.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.store[currentIndex];
      this.store[currentIndex] = this.store[randomIndex];
      this.store[randomIndex] = temporaryValue;
    }
  }
}

class Player {
  constructor(name, activeStack) {
    this.name = name;
    this.activeStack = new Stack(activeStack);
    this.discardStack = new Stack();
  }
}

class Game {
  // create a deck
  // create 2 new players, sets their stacks - activeStack, discardStack
  // game has an active stack
  constructor(player1, player2) {
    const cards = new Deck().cards;
    const player1Cards = cards.slice(0, 26);
    const player2Cards = cards.slice(26, cards.length);

    this.player1 = new Player(player1, player1Cards);
    this.player2 = new Player(player2, player2Cards);
  }
}

// Game of War
// 2 - draw stack, 1 - active stack, 2 - discard stacks
// 2 Users, use has stack

// game.player1.activeStack
// game.player1.discardStack
// game.activeStack
// game.player1.activeStack.shuffle()

const g = new Game('Michael', 'Hannah');
console.log(g.player1.activeStack.length());
console.log(g.player2.activeStack.length());
