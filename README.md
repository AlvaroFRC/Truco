# Truco Argentino

##### Learning code

This is a code to practice Javscript, with a basic HTML/CSS structure, to be able to see what I need. This can be improved later, since it will have all the tags ready to be changed into something better.

Normally, you would not be able to see the other player cards, but the point of this code, is able to simulate a game between 2 players, to make it harder to code.

https://es.wikipedia.org/wiki/Truco_argentino

## Currently working in the code:

### The Rounds

Currently, the game has working rounds, checking who won the round, when to switch to another player accordingly to the winner, checks for draws and the changes that the draws generate in the gameplay.

### The “Envido”

The winner of this bet is the player that can link 2 cards of the same suit that has the highest sum. The game is currently able to check if the player has 2 or more cards of the same suit, what's the best score to make with 2 of those in case it has more than 2, and compare who won the bet, comparing the numbers of both players.

### The "Truco"

Truco is a bet that can be made at any time of the game, and it is made by the winner of the round.

The rival player must answer with one fo the following options:

Reject. Rejects the truco and the opponent pair wins the round.
Accept. Accepts the bet that will be decided at the end of the round.
Retruco, Worth four. Raises the bet and passes the turn to the opponent to decide.

### Point system

The game has a working points system. When a player reaches 15 points, wins the game.

## TODO in the code:

### Refactor

Since the game is still being coded, lots of things are repeated, or coded to be able to spot bugs easily, when I reach V 1.0, the game will need a refactor to change a lot of repetitive code and things that can be simplified.
