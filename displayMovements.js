let gameEvents = [];
let games = [];

export default class View {
  generateMarkup = function (movements) {
    const containerMovements = document.querySelector(".movements");
    containerMovements.innerHTML = "";

    const movs = movements;

    movs.forEach((mov) => {
      let round = "";

      if (mov["round"] === true && mov["card2"] !== undefined) {
        round = `<img src="${mov["card1"]}" alt="round card" class="smallImage">  VS  <img src="${mov["card2"]}" alt="round card" class="smallImage">`;
        //Esto lo voy a cambiar, y que si esta en esas condiciones, saque la foto desde las jugadas,
      }
      if (mov["round"] === true && mov["card2"] === undefined) {
        round = ``;
      }
      if (mov["round"] === false) {
        round = `<img src="${mov["cardname"]}" alt="round card" class="smallImage"> 
        `;
      }
      const html = `
          <div class="movements__row">
          <div class="movements__value">${mov["info"]}</div>
            ${round}
          </div>
        `;
      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
  };
  // beforebegin / afterbegin / beforeend / afterend
  displayCardsEvents = function (info, cardname = "") {
    let round = false;
    // Create an object with info and cardname properties
    const event = { info, round, cardname };
    // Push the object to the gameEvents array
    gameEvents.push(event);
    this.generateMarkup(gameEvents);
  };

  displayRoundEvents = function (info) {
    let cardP1Index = gameEvents.length - 2;
    let cardP2Index = gameEvents.length - 1;
    let card1 = gameEvents[cardP1Index]["cardname"];
    let card2 = gameEvents[cardP2Index]["cardname"];
    let round = true;
    // Create an object with info and cardname properties
    const event = { info, round, card1, card2 };
    // Push the object to the gameEvents array
    gameEvents.push(event);
    this.generateMarkup(gameEvents);
  };

  generateGamesMarkup = function (movements, playerNumber) {
    const containerMovements = document.querySelector(".games");
    containerMovements.innerHTML = "";
    const player = playerNumber;
    //Cambiar este test test, a active player, pasar el parametro desde la funcion, y desde el call, asi puedo hacer que el fondo, se del color de player 1 o player 2, algun color diferente al rojo y verde, y que tengo que definir en el cuadrado de Player One y Player Two

    const movs = movements;

    movs.forEach((mov, i, arr) => {
      console.log("mov", mov);
      console.log("arr", arr);
      const html = `
          <div class="games__row p${mov["playerNumber"]}back">
          <div class="games__value">Partido N° ${i + 1}: ${mov["info"]}</div>

          </div>
        `;
      containerMovements.insertAdjacentHTML("beforeend", html);
    });
  };

  displayGamesEvents = function (info, playerNumber) {
    // Create an object with info and cardname properties
    const event = { info, playerNumber };
    // Push the object to the gameEvents array
    games.push(event);
    console.log(games);
    this.generateGamesMarkup(games, playerNumber);
  };
}

/*
.p1back {
  background-color: rgb(255, 187, 0);
}

.p2back {
  background-color: rgb(0, 140, 255);
}*/
/*
funciona para poner la carta en el display, pero la borra despues de cada movimiento, por que borra todo y no registra

podria cambiar gameEvents, de list a un dict, con keys de las cartas, y hacer que guarde el card, igual que guarda las cosas, y que con eso este..

y despues haga un tal, uso esto, y que con el index numer -1 y -2, haga el desplay de card1 vs card2
*/
