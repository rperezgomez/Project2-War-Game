const { Deck, Player, Game } = require('./script');
const { expect } = require('chai');

describe('Deck Class', () => {
    it('should create a deck of 52 cards', () => {
        const deck = new Deck();
        deck.createDeck();
        expect(deck.deck).to.have.lengthOf(52);
    });

    it('should contain cards with name and value', () => {
        const deck = new Deck();
        deck.createDeck();
        expect(deck.deck[0]).to.have.property('name');
        expect(deck.deck[0]).to.have.property('value');
    });

    it('should shuffle the deck', () => {
        const deck = new Deck();
        deck.createDeck();
        const originalOrder = [...deck.deck.map(card => card.name)];
        deck.shuffleDeck();
        const shuffledOrder = deck.deck.map(card => card.name);
        expect(shuffledOrder).to.not.deep.equal(originalOrder); // not a perfect test, but should usually pass
    });
});

describe('Player Class', () => {
    it('should initialize two players with empty hands and zero score', () => {
        const player = new Player();
        expect(player.player1.name).to.equal('Player 1');
        expect(player.player1.hand).to.be.an('array').that.is.empty;
        expect(player.player1.score).to.equal(0);
        expect(player.player2.name).to.equal('Player 2');
    });
});

describe('Game Class', () => {
    it('should distribute cards evenly between players', () => {
        const game = new Game();
        game.playGame();
        expect(game.player1.hand).to.have.lengthOf(26);
        expect(game.player2.hand).to.have.lengthOf(26);
    });

    it('should correctly update player scores after the game', () => {
        const game = new Game();
        game.playGame();
        const totalScore = game.player1.score + game.player2.score;
        // Because ties don't give points, total score can be < 26
        expect(totalScore).to.be.at.most(26);
    });
});