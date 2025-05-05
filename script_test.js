//Pull module  script.js so script_test.js know what the classes are
//ES modules used instead of cjs
import { Deck, Player, Game } from './script.js';
import { expect } from 'chai';

//Fist test is for Deck functions
describe('Deck Class', () => {
    //by using expect from chai it checks that 52 cards are played
    it('should create a deck of 52 cards', () => {
        const deck = new Deck();
        deck.createDeck();
        expect(deck.deck).to.have.lengthOf(52);
    });

    //Checks that each card played contains a rank and suit
    it('should contain cards with name and value', () => {
        const deck = new Deck();
        deck.createDeck();
        expect(deck.deck[0]).to.have.property('name');
        expect(deck.deck[0]).to.have.property('value');
    });

    //Had to get help with this test, but tests the deck is shuffled
    it('should shuffle the deck', () => {
        const deck = new Deck();
        deck.createDeck();
        const originalOrder = [...deck.deck.map(card => card.name)];
        deck.shuffleDeck();
        const shuffledOrder = deck.deck.map(card => card.name);
        expect(shuffledOrder).to.not.deep.equal(originalOrder); // not a perfect test, but should usually pass
    });
});

//This test is for Player class
describe('Player Class', () => {
    //This test checks if both players have no cards in hand by checking array and start off with 0 points
    it('should initialize two players with empty hands and zero score', () => {
        const player = new Player();
        expect(player.player1.name).to.equal('Player 1');
        expect(player.player1.hand).to.be.an('array').that.is.empty;
        expect(player.player1.score).to.equal(0);
        expect(player.player2.name).to.equal('Player 2');
    });
});

//This test is for Game class funtions
describe('Game Class', () => {
    //This test makes sure deck is divided evenly by two player. this would 26 cards each since the deck is 52 cards
    it('should distribute cards evenly between players', () => {
        const game = new Game();
        game.playGame();
        expect(game.player1.hand).to.have.lengthOf(26);
        expect(game.player2.hand).to.have.lengthOf(26);
    });

    //In this test I play the game to check score is updated corectly where combined score can not pass 26 points do to maximum amount of cards each player can play
    it('should correctly update player scores after the game', () => {
        const game = new Game();
        game.playGame();
        const totalScore = game.player1.score + game.player2.score;
        // Because ties don't give points, total score can be < 26
        expect(totalScore).to.be.at.most(26);
    });
});