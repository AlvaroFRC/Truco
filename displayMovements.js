let gameEvents = [];
let games = [];

export default class View {
  //Round actions events events

  // Markup

  generateMarkup = function (movements) {
    const containerMovements = document.querySelector(".movements");
    containerMovements.innerHTML = "";

    const movs = movements;

    movs.forEach((mov, i, arr) => {
      let round = "";

      //console.log("arr", arr);

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
      if (mov["round"] === "action") {
        round = ``;
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

  // Displays

  displayCardsEvents = function (info, cardname = "") {
    let round = false;
    // Create an object with info and cardname properties
    const event = { info, round, cardname };
    // Push the object to the gameEvents array
    gameEvents.push(event);
    this.generateMarkup(gameEvents);
  };

  displayEnvidoTrucoEvents = function (info) {
    let round = "action";
    // Create an object with info and cardname properties
    const event = { info, round };
    // Push the object to the gameEvents array
    gameEvents.push(event);
    this.generateMarkup(gameEvents);
  };

  displayRoundEvents = function (info) {
    // Copy from the gameEvents to filter
    let cardVsCard = [...gameEvents];
    // Filtered copy to get the card pictures easy
    const filteredArray = cardVsCard.filter((obj) => obj.round !== "action");
    // Cards info for display
    let cardP1Index = filteredArray.length - 2;
    let cardP2Index = filteredArray.length - 1;
    let card1 = filteredArray[cardP1Index]["cardname"];
    let card2 = filteredArray[cardP2Index]["cardname"];
    let round = true;
    // Create an object with info and cardname properties
    const event = { info, round, card1, card2 };
    // Push the object to the gameEvents array
    gameEvents.push(event);
    this.generateMarkup(gameEvents);
  };

  //Match result events

  //Markup

  generateGamesMarkup = function (movements, playerNumber) {
    const containerMovements = document.querySelector(".games");
    containerMovements.innerHTML = "";
    const player = playerNumber;
    //Cambiar este test test, a active player, pasar el parametro desde la funcion, y desde el call, asi puedo hacer que el fondo, se del color de player 1 o player 2, algun color diferente al rojo y verde, y que tengo que definir en el cuadrado de Player One y Player Two

    const movs = movements;

    movs.forEach((mov, i, arr) => {
      //console.log("mov", mov);
      //console.log("arr", arr);
      const html = `
          <div class="games__row p${mov["playerNumber"]}win">
          <div class="games__value">Partido N° ${i + 1}: ${mov["info"]}</div>

          </div>
        `;
      containerMovements.insertAdjacentHTML("beforeend", html);
    });
  };

  //Display game events
  displayGamesEvents = function (info, playerNumber) {
    // Create an object with info and cardname properties
    const event = { info, playerNumber };
    // Push the object to the gameEvents array
    games.push(event);
    //console.log(games);
    this.generateGamesMarkup(games, playerNumber);
  };
}
