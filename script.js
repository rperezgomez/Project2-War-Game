/*
Create an automated version of classic game war with only 2 player
The game will automatically play using console.log() to display turns, points, cards used, and outcome of the game. No user input required
Completed Project should
    1. Deal 26 cards to each player from a deck of 52
    2.Iterate through the turns where each player plays a card
    3.The player who playe the higher card gets a point. Ties no one gets a point
    4.After all cards have been played, display the score an ddeclare the winner
*/

//Create a deck class to structure how to organize the objects in a deck
//export will be used to reference the module class using ES modules
export class Deck 
{
    //constructor will initailaize the objects properties
    constructor()
    {
        //Create an empty array for deck that later will be filled
        this.deck = [];
        //Array for ranks
        this.ranks = 
        [
            "Ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King"
        ];
        //array for suits
        this.suits = 
        [
            "Hearts ♥",
            "Diamonds ♦",
            "Spades ♣",
            "Clubs ♠",
        ];
    }

    //Method where our function will create the deck by defining the actions of our objects
    //Will use itteration for our ranks and suits to fill our deck, and push out a new card  into this.deck
    createDeck()
    {
        for (let i = 0; i < this.ranks.length; i++ )
        {
            for (let j = 0; j < this.suits.length; j++)
            {
                   let card =
                    {
                        //Used Template literals to create string
                        name: `${this.ranks[i]} of ${this.suits[j]}`,
                        value: i+1
                    }
                    this.deck.push(card)
            }
        }
    }

    shuffleDeck()
    {
        for (let i = 0; i < this.deck.length; i++) 
            {
            // picks the random number between 0 and length of the deck
            let shuffle = Math.floor(Math.random() * (this.deck.length));
            
            //swap the current with a random position
            [this.deck[i], this.deck[shuffle]] = [ this.deck[shuffle], this.deck[i]];
          } 
    }
}

export class Player
{
    //constructor will initailaize the objects properties for players
    constructor()
    {
        this.player1 = 
        {
            //player1 info
            name: 'Player 1',
            //Starting score
            score: 0,
            //empty array to fill player1 hand
            hand: []
        }

        this.player2 = 
        {
            //player1 info
            name: 'Player 2',
            //Starting score
            score: 0,
            //empty array to fill player2 hand
            hand: []
        }
    }
}

//to call on the player class I extended Game class from Player and used super to call on my player constructor
export class Game extends Player
{
    constructor()
    {
        super();
    }
    //method to play the game
    playGame()
    {
        //create new deck by filling array with ranks/suits and shuffle
        const deck = new Deck
        deck.createDeck()
        deck.shuffleDeck()

        //Created while loop to fill player hand while it is not 0
        while (deck.deck.length !==0)
        {
            //push a card out to player and used shift to remove card form deck
            this.player1.hand.push(deck.deck.shift())
            this.player2.hand.push(deck.deck.shift())
        }

        //made turns dynamic do to being better practice
        for (let i = 0; i< this.player1.hand.length; i++)
        {
            //logic for the game on who is awarded points
            //this if statement is if player 1 wins they get a point
            if (this.player1.hand[i].value > this.player2.hand[i].value)
            {
                //add a point
                this.player1.score ++
                console.log
                (`
                    Player 1 Card: ${this.player1.hand[i].name}
                    Player 2 Card: ${this.player2.hand[i].name}
                    Player 1 wins a point!
                    Current Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
                `)
            }
            //else if statement for logic if player2 wins
            else if (this.player1.hand[i].value < this.player2.hand[i].value)
            {
                this.player2.score ++
                console.log
                (`
                    Player 1 Card: ${this.player1.hand[i].name}
                    Player 2 Card: ${this.player2.hand[i].name}
                    Player 2 wins a point!
                    Current Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
                `)
            }
                //else statements if there is a tie no points awarded
            else
            {
                console.log
                (`
                    Player 1 Card: ${this.player1.hand[i].name}
                    Player 2 Card: ${this.player2.hand[i].name}
                    Tie: No points awarded!
                    Current Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
                `)
            }
        }

        //if statement to print out winner
        //statement if player1 wins
        if (this.player1.score > this.player2.score)
        {
            console.log
            (`
                    Player 1 Wins!
                    Final Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
            `)
        }
        //statement if player2 wins
        else if (this.player1.score < this.player2.score)
        {
            console.log
            (`
                    Player 2 Wins!
                    Final Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
            `)
        }
        else
        {
            //statement if tie
            console.log
            (`
                    Tie!
                    Final Score: 
                    Player 1: ${this.player1.score}
                    Player 2: ${this.player2.score}
            `)
        }
    }
}

const game = new Game
game.playGame()

//export class Deck,Player,and Game to script_test for testing functions
//used ES modules over Cjs modules because after research ES modules recommened over Cjs


