"use strict";

import View from "./displayMovements";
import * as cards from "./cards";

//buttons
const btnReset = document.querySelector(".reset");
const btnDeal = document.querySelector(".deal");
const btnNewGame = document.querySelector(".newGame");
//cards buttons
const btnP1card1 = document.querySelector(".button1");
const btnP1card2 = document.querySelector(".button2");
const btnP1card3 = document.querySelector(".button3");
const btnP2card1 = document.querySelector(".button4");
const btnP2card2 = document.querySelector(".button5");
const btnP2card3 = document.querySelector(".button6");
//Envido buttons
const envidoButtonP1 = document.querySelector(".envidoButtonP1");
const envidoButtonP2 = document.querySelector(".envidoButtonP2");
//Truco buttons
const trucoButtonP1 = document.querySelector(".trucoButtonP1");
const trucoButtonP2 = document.querySelector(".trucoButtonP2");
const reTrucoButtonP1 = document.querySelector(".reTrucoButtonP1");
const reTrucoButtonP2 = document.querySelector(".reTrucoButtonP2");
const valeCuatroButtonP1 = document.querySelector(".valeCuatroButtonP1");
const valeCuatroButtonP2 = document.querySelector(".valeCuatroButtonP2");
// Accept and Reject buttons
const acceptButtonP1 = document.querySelector(".acceptButtonP1");
const acceptButtonP2 = document.querySelector(".acceptButtonP2");
const rejectButtonP1 = document.querySelector(".rejectButtonP1");
const rejectButtonP2 = document.querySelector(".rejectButtonP2");
//table cards
const slotR1P1 = document.querySelector(".slotR1P1");
const slotR1P2 = document.querySelector(".slotR1P2");
const slotR2P1 = document.querySelector(".slotR2P1");
const slotR2P2 = document.querySelector(".slotR2P2");
const slotR3P1 = document.querySelector(".slotR3P1");
const slotR3P2 = document.querySelector(".slotR3P2");
// points labels
const envidoScore1 = document.querySelector(".scoreEnvidoValue1");
const envidoScore2 = document.querySelector(".scoreEnvidoValue2");
//envido labels
const pointsLableP1 = document.querySelector(".pointsP1");
const pointsLableP2 = document.querySelector(".pointsP2");
//Backgrounds
const p1Backgound = document.querySelector(".playerOneTable");
const p2Backgound = document.querySelector(".playerTwoTable");
//timer label
const timerLabel = document.querySelector(".timerLabel");

const infoSlotP1 = document.querySelector(".infoSlotP1");
const infoSlotP2 = document.querySelector(".infoSlotP2");

// code logic

// variables

let selectedCards = {};
let player1Cards = {};
let player2Cards = {};
let p1card = 0;
let p2card = 0;
let p1points = 0;
let p2points = 0;
let timer;
let currentPlayer = Math.floor(Math.random() * 2) + 1; // Initial player
let p1RoundChoice = 0;
let p2RoundChoice = 0;
let currentRound = 1;

let envidoCall = false;
let envidoEnvidoCall = false;
let acceptEnvido = false;
let trucoCallFromP1 = false;
let trucoCallFromP2 = false;
let retrucoCallFromP1 = false;
let retrucoCallFromP2 = false;
let valeCuatroCall = false;
let buttonaction = false;
let buttonsPressCounter = 0;

let p1 = 1;
let p2 = 2;

//colors

let activePlayerColor = "seagreen";
let inactivePlayerColor = "firebrick";

// funciones

// Create an instance of the View class
const myView = new View();

// Example data for movements

// Call the displayCardsEvents method

// Mazo de cartas

const mazo = {
  club: {
    one: { score: 13, envido: 1 },
    two: { score: 9, envido: 2 },
    three: { score: 10, envido: 3 },
    four: { score: 1, envido: 4 },
    five: { score: 2, envido: 5 },
    six: { score: 3, envido: 6 },
    seven: { score: 4, envido: 7 },
    jack: { score: 5, envido: 0 },
    knight: { score: 6, envido: 0 },
    king: { score: 7, envido: 0 },
  },
  cup: {
    one: { score: 8, envido: 1 },
    two: { score: 9, envido: 2 },
    three: { score: 10, envido: 3 },
    four: { score: 1, envido: 4 },
    five: { score: 2, envido: 5 },
    six: { score: 3, envido: 6 },
    seven: { score: 4, envido: 7 },
    jack: { score: 5, envido: 0 },
    knight: { score: 6, envido: 0 },
    king: { score: 7, envido: 0 },
  },
  sword: {
    one: { score: 14, envido: 1 },
    two: { score: 9, envido: 2 },
    three: { score: 10, envido: 3 },
    four: { score: 1, envido: 4 },
    five: { score: 2, envido: 5 },
    six: { score: 3, envido: 6 },
    seven: { score: 12, envido: 7 },
    jack: { score: 5, envido: 0 },
    knight: { score: 6, envido: 0 },
    king: { score: 7, envido: 0 },
  },
  gold: {
    one: { score: 8, envido: 1 },
    two: { score: 9, envido: 2 },
    three: { score: 10, envido: 3 },
    four: { score: 1, envido: 4 },
    five: { score: 2, envido: 5 },
    six: { score: 3, envido: 6 },
    seven: { score: 11, envido: 7 },
    jack: { score: 5, envido: 0 },
    knight: { score: 6, envido: 0 },
    king: { score: 7, envido: 0 },
  },
};

function getRandomCard() {
  const randomPalo = Math.floor(Math.random() * 4);
  const randomCarta = Math.floor(Math.random() * 10);
  const palo = Object.keys(mazo)[randomPalo];
  const carta = Object.keys(mazo.club)[randomCarta];
  const score = mazo[palo][carta].score;
  const envido = mazo[palo][carta].envido;
  let cardName = `${palo}${carta}`;
  let finalCard = { name: cardName, palo, score, envido };
  return finalCard;
}

const dealCards = function () {
  while (Object.keys(selectedCards).length < 6) {
    const card = getRandomCard();
    const cardName = card["name"];
    if (!selectedCards.hasOwnProperty(cardName)) {
      selectedCards[cardName] = card;
      if (Object.keys(player1Cards).length < 3) {
        p1card++;
        player1Cards[p1card] = card;
      } else {
        p2card++;
        player2Cards[p2card] = card;
      }
    }
  }
};

dealCards();

const calcEnvido = function (playerCards) {
  const card1 = playerCards["1"]["palo"];
  const card2 = playerCards["2"]["palo"];
  const card3 = playerCards["3"]["palo"];
  const value1 = playerCards["1"]["envido"];
  const value2 = playerCards["2"]["envido"];
  const value3 = playerCards["3"]["envido"];
  if (card1 === card2 && card2 === card3) {
    // All the cards are the same, get the score of the 2 bigger numbers
    const lowest = Math.min(value1, value2, value3);
    const finalNumer = value1 + value2 + value3 - lowest + 20;
    return finalNumer;
  } else {
    // If they are not all the same, check if there are 2
    if (card1 === card2) {
      const valorEnvido = value1 + value2 + 20;
      return valorEnvido;
    }
    if (card1 === card3) {
      const valorEnvido = value1 + value3 + 20;
      return valorEnvido;
    }
    if (card2 === card3) {
      const valorEnvido = value2 + value3 + 20;
      return valorEnvido;
    } else {
      return Math.max(value1, value2, value3);
    }
  }
};

const highestEnvido = function (p1, p2) {
  if (Number(p1) === Number(p2)) {
    return 3;
  }
  if (Number(p1) > Number(p2)) {
    return 1;
  } else return 2;
};

const checkRoundWinner = function (cardp1, cardp2) {
  // Checks the valuew of the card selection for each player and returns the winner, P1=1, P2=2, Draw=3
  if (player1Cards[cardp1].score === player2Cards[cardp2].score) {
    return 3;
  }
  if (player1Cards[cardp1].score > player2Cards[cardp2].score) {
    return 1;
  }
  if (player1Cards[cardp1].score < player2Cards[cardp2].score) {
    return 2;
  }
};

const checkRightPlayer = function (current, player) {
  //Checks if the current player its the player that won the round, if thats correct, doesnt change, else, switchs
  if (current === player) {
  } else {
    switchPlayer();
  }
};
// Tengo que reactivar lo de desactive en el timerrrrrr aca abajo
const startPlayTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    time++;

    // Change label // Reactuvar estO:
    timerLabel.textContent = `Playing time: ${min}:${sec}`;
  };
  let time = 0;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const newGame = function () {
  currentPlayer = Math.floor(Math.random() * 2) + 1;

  p1points = 0;
  p2points = 0;

  p1buttonColor();
  p2buttonColor();

  if (timer) clearInterval(timer);
  timer = startPlayTimer();

  // Hacer un clear de los movimientos y rounds

  nextRound();
};

const nextRound = function () {
  switchPlayer();

  selectedCards = {};
  player1Cards = {};
  player2Cards = {};
  p1card = 0;
  p2card = 0;

  p1RoundChoice = 0;
  p2RoundChoice = 0;
  currentRound = 1;
  p1roundsWon = 0;
  p2roundsWon = 0;

  envidoCall = false;
  envidoEnvidoCall = false;
  acceptEnvido = false;
  trucoCallFromP1 = false;
  trucoCallFromP2 = false;
  retrucoCallFromP1 = false;
  retrucoCallFromP2 = false;
  valeCuatroCall = false;
  buttonaction = false;

  p1 = 1;
  p2 = 2;

  dealCards();
  revealCards();
  startingButtons(currentPlayer);

  btnP1card1.disabled = false;
  btnP1card2.disabled = false;
  btnP1card3.disabled = false;
  btnP2card1.disabled = false;
  btnP2card2.disabled = false;
  btnP2card3.disabled = false;

  slotR1P1.querySelector("img").src = cards.emptycard;
  slotR1P2.querySelector("img").src = cards.emptycard;
  slotR2P1.querySelector("img").src = cards.emptycard;
  slotR2P2.querySelector("img").src = cards.emptycard;
  slotR3P1.querySelector("img").src = cards.emptycard;
  slotR3P2.querySelector("img").src = cards.emptycard;

  //Envido
  envidoScore1.textContent = `${calcEnvido(player1Cards)}`;
  envidoScore2.textContent = `${calcEnvido(player2Cards)}`;

  pointsLableP1.textContent = `Puntos ${p1points}/15`;
  pointsLableP2.textContent = `Puntos ${p2points}/15`;

  roundOne();
};

function getCardImagePath(cardName) {
  // To refactor img source from static to import
  return cards[cardName];
}

const revealCards = function () {
  // Used at the start of the round to display the 6 playing cards
  btnP1card1.querySelector("img").src = getCardImagePath(
    `${player1Cards[1]["name"]}`
  );
  btnP1card2.querySelector("img").src = getCardImagePath(
    `${player1Cards[2]["name"]}`
  );
  btnP1card3.querySelector("img").src = getCardImagePath(
    `${player1Cards[3]["name"]}`
  );

  btnP2card1.querySelector("img").src = getCardImagePath(
    `${player2Cards[1]["name"]}`
  );
  btnP2card2.querySelector("img").src = getCardImagePath(
    `${player2Cards[2]["name"]}`
  );
  btnP2card3.querySelector("img").src = getCardImagePath(
    `${player2Cards[3]["name"]}`
  );
};

const switchPlayer = function () {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  if (currentPlayer === 1) {
    p2buttonsDisabler();
    p2buttonColor();

    //THIS IS CLOSE TO BE FINISHED, JUST THE LAST TOUCHES

    if (buttonaction === false) {
      console.log("this round wasnt about a button, it was about a card");

      // P1 Truco
      if (trucoCallFromP2 === false && trucoCallFromP1 === false) {
        console.log("1 P1 Truco button avaible");
        p1buttonsDisabler(true, false, true, true, true, true);
      }
      // P1 Retruco

      if (
        trucoCallFromP2 === true &&
        valeCuatroCall === false &&
        retrucoCallFromP1 === false
      ) {
        console.log("2 P1 Retruco button available");
        p1buttonsDisabler(true, true, false, true, true, true);
      }

      // P1 ValeCuatro
      // p2 retrucocall === true | valecuatrocall === false

      if (retrucoCallFromP2 === true && valeCuatroCall === false) {
        console.log("3 P1 Vale Cuatro button available");
        p1buttonsDisabler(true, true, true, false, true, true);
      }

      // P1 Envido

      if (
        envidoCall === false &&
        acceptEnvido !== true &&
        trucoCallFromP2 === false &&
        currentRound === 1
      ) {
        console.log("4 P1 Envido button avaible");
        p1buttonsDisabler(false, false, true, true, true, true);
      }

      //Doesn't matter the changes, p2buttons are disabled
      p2buttonsDisabler();
      p2buttonColor();
    }

    /* Aca tengo que hacer todos los swithcs y checks de calls, y en los botones, solo las calls, y llamar al switch, entonces en el switch se hacen los botones y no se solapa en 2 lugares diferentes */

    /*Los botones de envido y truco, tienen que deshabilitar las cartas del otro player, los botones de acepto tienen que rehabilitarlas, y rehabilitar los 2 lados, por que en elcaso de un envido envido, o truco retruco vale 4, tienen que rehabilitar los 2 lados*/

    //Cambia el background
    p1Backgound.style.backgroundColor = activePlayerColor;
    p2Backgound.style.backgroundColor = inactivePlayerColor;
    p1Backgound.style.borderColor = "green";
    p2Backgound.style.borderColor = "red";

    //temporal, despues borrar o refactor
    infoSlotP2.style.backgroundColor = "";
    infoSlotP2.style.borderColor = "";
    //termina temporal

    //Deshabilita los botones del rival
    btnP1card1.disabled = false;
    btnP1card2.disabled = false;
    btnP1card3.disabled = false;
    btnP2card1.disabled = true;
    btnP2card2.disabled = true;
    btnP2card3.disabled = true;
    //envidos

    // Revisa que si el boton ya fue apretado (atravez del img source, lo mantenga deshabilitado)
    if (btnP1card1.querySelector("img").src.includes("backside")) {
      btnP1card1.disabled = true;
    }
    btnP1card1.disabled = btnP1card1.disabled === true ? true : false;

    if (btnP1card2.querySelector("img").src.includes("backside")) {
      btnP1card2.disabled = true;
    }
    btnP1card2.disabled = btnP1card2.disabled === true ? true : false;

    if (btnP1card3.querySelector("img").src.includes("backside")) {
      btnP1card3.disabled = true;
    }
    btnP1card3.disabled = btnP1card3.disabled === true ? true : false;

    if (btnP2card1.querySelector("img").src.includes("backside")) {
      btnP2card1.disabled = true;
    }
    btnP2card1.disabled = btnP2card1.disabled === true ? true : false;

    if (btnP2card2.querySelector("img").src.includes("backside")) {
      btnP2card2.disabled = true;
    }
    btnP2card2.disabled = btnP2card2.disabled === true ? true : false;
    if (btnP2card3.querySelector("img").src.includes("backside")) {
      btnP2card3.disabled = true;
    }
    btnP2card3.disabled = btnP2card3.disabled === true ? true : false;
  } else {
    p1buttonsDisabler();
    p1buttonColor();

    if (buttonaction === false) {
      console.log("this round wasnt about a button, it was about a card");

      // P2 Truco
      if (trucoCallFromP1 === false && trucoCallFromP2 === false) {
        console.log("5 P2 Truco button avaible");
        p2buttonsDisabler(true, false, true, true, true, true);
      }
      // P1 Retruco

      if (
        trucoCallFromP1 === true &&
        valeCuatroCall === false &&
        retrucoCallFromP2 === false
      ) {
        console.log("6 P2 Retruco button available");
        p2buttonsDisabler(true, true, false, true, true, true);
      }

      // P2 ValeCuatro
      // p2 retrucocall === true | valecuatrocall === false

      if (retrucoCallFromP1 === true && valeCuatroCall === false) {
        console.log("7 P2 Vale Cuatro button available");
        p2buttonsDisabler(true, true, true, false, true, true);
      }

      // P2 Envido

      if (
        envidoCall === false &&
        acceptEnvido !== true &&
        trucoCallFromP1 === false &&
        currentRound === 1
      ) {
        console.log("8 P2 Envido button avaible");
        p2buttonsDisabler(false, false, true, true, true, true);
      }

      //Doesn't matter the changes, p2buttons are disabled
      p1buttonsDisabler();
      p1buttonColor();
    }
    //Cambia el background
    p1Backgound.style.backgroundColor = inactivePlayerColor;
    p2Backgound.style.backgroundColor = activePlayerColor;
    p2Backgound.style.borderColor = "green";
    p1Backgound.style.borderColor = "red";

    //temporal, despues borrar o refactor
    infoSlotP1.style.backgroundColor = "";
    infoSlotP1.style.borderColor = "";
    //termina temporal

    // Deshabilita los botones del rival
    btnP1card1.disabled = true;
    btnP1card2.disabled = true;
    btnP1card3.disabled = true;
    btnP2card1.disabled = false;
    btnP2card2.disabled = false;
    btnP2card3.disabled = false;

    // Revisa que si el boton ya fue apretado (atravez del img source, lo mantenga deshabilitado)
    if (btnP1card1.querySelector("img").src.includes("backside")) {
      btnP1card1.disabled = true;
    }
    btnP1card1.disabled = btnP1card1.disabled === true ? true : false;

    if (btnP1card2.querySelector("img").src.includes("backside")) {
      btnP1card2.disabled = true;
    }
    btnP1card2.disabled = btnP1card2.disabled === true ? true : false;

    if (btnP1card3.querySelector("img").src.includes("backside")) {
      btnP1card3.disabled = true;
    }
    btnP1card3.disabled = btnP1card3.disabled === true ? true : false;

    if (btnP2card1.querySelector("img").src.includes("backside")) {
      btnP2card1.disabled = true;
    }
    btnP2card1.disabled = btnP2card1.disabled === true ? true : false;

    if (btnP2card2.querySelector("img").src.includes("backside")) {
      btnP2card2.disabled = true;
    }
    btnP2card2.disabled = btnP2card2.disabled === true ? true : false;
    if (btnP2card3.querySelector("img").src.includes("backside")) {
      btnP2card3.disabled = true;
    }
    btnP2card3.disabled = btnP2card3.disabled === true ? true : false;
  }
};

const p1buttonsDisabler = function (
  envido = true,
  truco = true,
  retruco = true,
  valecuatro = true,
  accept = true,
  reject = true
) {
  envidoButtonP1.disabled = envido;
  trucoButtonP1.disabled = truco;
  reTrucoButtonP1.disabled = retruco;
  valeCuatroButtonP1.disabled = valecuatro;
  acceptButtonP1.disabled = accept;
  rejectButtonP1.disabled = reject;
};

const p1buttonColor = function (
  envido = "lightgray",
  truco = "lightgray",
  retruco = "lightgray",
  valecuatro = "lightgray",
  accept = "lightgray",
  reject = "lightgray"
) {
  envidoButtonP1.style.background = envido;
  trucoButtonP1.style.background = truco;
  reTrucoButtonP1.style.background = retruco;
  valeCuatroButtonP1.style.background = valecuatro;
  acceptButtonP1.style.background = accept;
  rejectButtonP1.style.background = reject;
};

const p2buttonColor = function (
  envido = "lightgray",
  truco = "lightgray",
  retruco = "lightgray",
  valecuatro = "lightgray",
  accept = "lightgray",
  reject = "lightgray"
) {
  envidoButtonP2.style.background = envido;
  trucoButtonP2.style.background = truco;
  reTrucoButtonP2.style.background = retruco;
  valeCuatroButtonP2.style.background = valecuatro;
  acceptButtonP2.style.background = accept;
  rejectButtonP2.style.background = reject;
};

const p2buttonsDisabler = function (
  envido = true,
  truco = true,
  retruco = true,
  valecuatro = true,
  accept = true,
  reject = true
) {
  envidoButtonP2.disabled = envido;
  trucoButtonP2.disabled = truco;
  reTrucoButtonP2.disabled = retruco;
  valeCuatroButtonP2.disabled = valecuatro;
  acceptButtonP2.disabled = accept;
  rejectButtonP2.disabled = reject;
};

const startingButtons = function (activeplayer) {
  if (activeplayer === 1) {
    p1buttonsDisabler(false, false, true, true, true, true);
    p2buttonsDisabler();
  }
  if (activeplayer === 2) {
    p1buttonsDisabler();
    p2buttonsDisabler(false, false, true, true, true, true);
  }
};

const disableEnvidoButtons = function () {
  p1buttonsDisabler(true, false, false, false, true, true);
  p2buttonsDisabler(true, false, false, false, true, true);
};

const addEnvidoPoints = function () {
  // envidoWinner checks the winner
  let envidoWinner = highestEnvido(
    calcEnvido(player1Cards),
    calcEnvido(player2Cards)
  );
  // if envido is a draw (=== 3), the "hand player" will win
  if (acceptEnvido === true) {
    if (envidoWinner === 3) {
      envidoWinner = currentPlayer;
    }
    // else, player 1 or 2 will get the points
    if (envidoWinner === 1) {
      if (acceptEnvido) p1points += 2;
      if (envidoEnvidoCall) p1points += 2;
    }
    if (envidoWinner === 2) {
      if (acceptEnvido) p2points += 2;
      if (envidoEnvidoCall) p2points += 2;
    }
  }
  // This function is called at the start of round 2, so points will be added there
  pointsLableP1.textContent = `Puntos ${p1points}/15`;
  pointsLableP2.textContent = `Puntos ${p2points}/15`;
};

const buttonsSwitch = function () {
  /** This function checks the amount of times a button was pressed,
   * to check if it needs to switch player when accepted or rejected */
  if (buttonsPressCounter % 2 !== 0) {
    switchPlayer();
    buttonsPressCounter = 0;
  } else {
    switchPlayer();
    switchPlayer();
    buttonsPressCounter = 0;
  }
};

const roundpoints = function () {
  totalPoints = 0;
  if (trucoCallFromP1 === false && trucoCallFromP2 === false) {
    console.log("no se canto truco, puntos +1 | first exit");
    totalPoints += 1;
  } else {
    console.log("si se canto truco, puntos +2 | second exit");
    totalPoints += 2;
    if (retrucoCallFromP1 === false && retrucoCallFromP2 === false) {
      console.log("no se canto retruco, puntos +0 | third exit");
    } else {
      console.log("si se canto retruco, puntos + 1 | fourth exit");
      totalPoints += 1;
      if (valeCuatroCall === false) {
        console.log("no se canto retruco, puntos +0 | fifth exit");
      } else {
        console.log("si se canto retruco, puntos + 1 | sixth exit");
        totalPoints += 1;
      }
    }
  }
  console.log("totalpoints:", totalPoints);
  return totalPoints;
};

class playerCardsClass {
  _parentElement = document.querySelector(".gameSpace");

  clickHandler() {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".cardBtn");
      if (!btn) return;

      const player = btn.dataset.player;
      const cardChoice = btn.dataset.roundcard;
      const deck = player === "1" ? player1Cards : player2Cards;

      p1RoundChoice = player === "1" ? +cardChoice : p1RoundChoice;
      p2RoundChoice = player === "2" ? +cardChoice : p2RoundChoice;

      player === "1"
        ? (p1RoundChoice = +cardChoice)
        : (p2RoundChoice = +cardChoice);

      btn.querySelector("img").src = cards.zbackside;

      const selector = document.querySelector(
        `.slotR${currentRound}P${player}`
      );

      selector.querySelector("img").src = getCardImagePath(
        `${deck[cardChoice]["name"]}`
      );

      buttonaction = false;

      switchPlayer();

      myView.displayCardsEvents(
        `Player ${player} used: `,
        getCardImagePath(`${deck[cardChoice]["name"]}`)
      );
    });
  }
}

const playerCardsButtons = new playerCardsClass();

playerCardsButtons.clickHandler();

envidoButtonP1.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP2.style.backgroundColor = "springgreen";
  infoSlotP2.style.borderColor = "green";
  //termina temporal
  // buttonaction means the click was in a button and not in a card
  // buttonPresCounter is to check chain of buttons for the playwer switch
  if (envidoCall) {
    myView.displayEnvidoTrucoEvents(`P1 Canto Envido Envido`);
    p2buttonsDisabler(true, true, true, true, false, false);
    p2buttonColor(
      "lightgray",
      "lightgray",
      "lightgray",
      "lightgray",
      "green",
      "red"
    );
    envidoEnvidoCall = true;
    buttonsPressCounter++;
  } else {
    myView.displayEnvidoTrucoEvents(`P1 Canto Envido`);
    p2buttonsDisabler(false, true, true, true, false, false);
    p2buttonColor(
      "green",
      "lightgray",
      "lightgray",
      "lightgray",
      "green",
      "red"
    );
    envidoCall = true;
    buttonsPressCounter++;
  }
  buttonaction = true;
  switchPlayer();
  btnP2card1.disabled = true;
  btnP2card2.disabled = true;
  btnP2card3.disabled = true;
});

envidoButtonP2.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP1.style.backgroundColor = "springgreen";
  infoSlotP1.style.borderColor = "green";
  //termina temporal
  if (envidoCall) {
    myView.displayEnvidoTrucoEvents(`P2 Canto Envido Envido`);
    p1buttonsDisabler(true, true, true, true, false, false);
    p1buttonColor(
      "lightgray",
      "lightgray",
      "lightgray",
      "lightgray",
      "green",
      "red"
    );
    envidoEnvidoCall = true;
    buttonsPressCounter++;
  } else {
    myView.displayEnvidoTrucoEvents(`P2 Canto Envido`);
    p1buttonsDisabler(false, true, true, true, false, false);
    p1buttonColor(
      "green",
      "lightgray",
      "lightgray",
      "lightgray",
      "green",
      "red"
    );
    envidoCall = true;
    buttonsPressCounter++;
  }
  buttonaction = true;
  switchPlayer();
});

trucoButtonP1.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP2.style.backgroundColor = "springgreen";
  infoSlotP2.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P1 Canto Truco`);
  p2buttonsDisabler(true, true, false, true, false, false);
  p2buttonColor("lightgray", "lightgray", "green", "lightgray", "green", "red");
  trucoCallFromP1 = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

trucoButtonP2.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP1.style.backgroundColor = "springgreen";
  infoSlotP1.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P2 Canto Truco`);
  p1buttonsDisabler(true, true, false, true, false, false);
  p1buttonColor("lightgray", "lightgray", "green", "lightgray", "green", "red");
  trucoCallFromP2 = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

reTrucoButtonP1.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP2.style.backgroundColor = "springgreen";
  infoSlotP2.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P1 Canto Retruco`);
  p2buttonsDisabler(true, true, true, false, false, false);
  p2buttonColor("lightgray", "lightgray", "lightgray", "green", "green", "red");
  retrucoCallFromP1 = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

reTrucoButtonP2.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP1.style.backgroundColor = "springgreen";
  infoSlotP1.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P2 Canto Retruco`);
  p1buttonsDisabler(true, true, true, false, false, false);
  p1buttonColor("lightgray", "lightgray", "lightgray", "green", "green", "red");
  retrucoCallFromP2 = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

valeCuatroButtonP1.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP2.style.backgroundColor = "springgreen";
  infoSlotP2.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P1 Canto Vale Cuatro`);
  p2buttonsDisabler(true, true, true, true, false, false);
  p2buttonColor(
    "lightgray",
    "lightgray",
    "lightgray",
    "lightgray",
    "green",
    "red"
  );
  valeCuatroCall = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

valeCuatroButtonP2.addEventListener("click", function () {
  //temporal, despues borrar o refactor
  infoSlotP1.style.backgroundColor = "springgreen";
  infoSlotP1.style.borderColor = "green";
  //termina temporal
  myView.displayEnvidoTrucoEvents(`P2 Canto Vale Cuatro`);
  p1buttonsDisabler(true, true, true, true, false, false);
  p1buttonColor(
    "lightgray",
    "lightgray",
    "lightgray",
    "lightgray",
    "green",
    "red"
  );
  valeCuatroCall = true;
  buttonaction = true;
  buttonsPressCounter++;
  switchPlayer();
});

acceptButtonP1.addEventListener("click", function () {
  buttonaction = true;
  p1buttonColor();
  p1buttonsDisabler();

  if (valeCuatroCall) {
    myView.displayEnvidoTrucoEvents("P1 Vale Cuatro Aceptado");
    buttonsSwitch();
  } else if (retrucoCallFromP2) {
    myView.displayEnvidoTrucoEvents("P1 Retruco Aceptado");
    buttonsSwitch();
  } else if (trucoCallFromP2) {
    myView.displayEnvidoTrucoEvents("P1 Truco Aceptado");
    buttonsSwitch();
  }

  if (envidoEnvidoCall) {
    myView.displayEnvidoTrucoEvents("P1 Envido Envido Aceptado");
    acceptEnvido = true;

    buttonsSwitch();
  } else if (envidoCall) {
    myView.displayEnvidoTrucoEvents("P1 Envido Aceptado");
    acceptEnvido = true;

    buttonsSwitch();
  }
});

acceptButtonP2.addEventListener("click", function () {
  buttonaction = true;
  p2buttonColor();
  infoSlotP2.style.borderColor = "black";
  p2buttonsDisabler();

  if (valeCuatroCall) {
    myView.displayEnvidoTrucoEvents("P2 Vale Cuatro Aceptado");
    buttonsSwitch();
  } else if (retrucoCallFromP1) {
    myView.displayEnvidoTrucoEvents("P2 Retruco Aceptado");
    buttonsSwitch();
  } else if (trucoCallFromP1) {
    myView.displayEnvidoTrucoEvents("P2 Truco Aceptado");
    buttonsSwitch();
  }

  if (envidoEnvidoCall) {
    myView.displayEnvidoTrucoEvents("P2 Envido Envido Aceptado");
    acceptEnvido = true;

    buttonsSwitch();
  } else if (envidoCall) {
    myView.displayEnvidoTrucoEvents("P2 Envido Aceptado");
    acceptEnvido = true;

    buttonsSwitch();
  }
});

rejectButtonP1.addEventListener("click", function () {
  p1buttonsDisabler();
  // Checks round 1, to add envido points, since they are added at the end of round 1.
  // If the round ends before round one, points it will be added here.
  if (currentRound === 1) {
    addEnvidoPoints();
  }
  // Display the events, add the points -1 for the rejection
  if (valeCuatroCall) {
    myView.displayEnvidoTrucoEvents(`P1 rechazo el Vale 4`);
    myView.displayGamesEvents(`** El Player 2 gano por rechazo **`, 2);
    p2points += roundpoints();
    p2points--;
    nextRound();
  } else if (retrucoCallFromP2) {
    myView.displayEnvidoTrucoEvents(`P1 rechazo el Retruco`);
    myView.displayGamesEvents(`** El Player 2 gano por rechazo **`, 2);
    p2points += roundpoints();
    p2points--;
    nextRound();
  } else if (trucoCallFromP2) {
    myView.displayEnvidoTrucoEvents(`P1 rechazo el Truco`);
    myView.displayGamesEvents(`** El Player 2 gano por rechazo **`, 2);
    p2points += roundpoints();
    p2points--;
    nextRound();
  }

  // Display the events, add the points for the rejection, and re-changes the value of accept envido to false
  // Since its false, point will not be added again in another round because of the check in addEnvidoPoints

  if (envidoEnvidoCall) {
    myView.displayEnvidoTrucoEvents(`P1 rechazo el Envido Envido`);
    acceptEnvido = false;
    p2points += 2;
    p1buttonsDisabler();
    p1buttonColor();
    infoSlotP1.style.backgroundColor = "";
    infoSlotP1.style.borderColor = "";
  } else if (envidoCall) {
    myView.displayEnvidoTrucoEvents(`P1 rechazo el Envido`);
    acceptEnvido = false;
    p2points += 1;
    switchPlayer();
  }
});

rejectButtonP2.addEventListener("click", function () {
  p2buttonsDisabler();
  // Checks round 1, to add envido points, since they are added at the end of round 1.
  // If the round ends before round one, points it will be added here.
  if (currentRound === 1) {
    addEnvidoPoints();
  }
  // Display the events, add the points -1 for the rejection
  if (valeCuatroCall) {
    myView.displayEnvidoTrucoEvents(`P2 rechazo el Vale 4`);
    myView.displayGamesEvents(`** El Player 1 gano por rechazo **`, 1);
    p1points += roundpoints();
    p1points--;
    nextRound();
  } else if (retrucoCallFromP1) {
    myView.displayEnvidoTrucoEvents(`P2 rechazo el Retruco`);
    myView.displayGamesEvents(`** El Player 1 gano por rechazo **`, 1);
    p1points += roundpoints();
    p1points--;
    nextRound();
  } else if (trucoCallFromP1) {
    myView.displayEnvidoTrucoEvents(`P2 rechazo el Truco`);
    myView.displayGamesEvents(`** El Player 1 gano por rechazo **`, 1);
    p1points += roundpoints();
    p1points--;
    nextRound();
  }

  // Display the events, add the points for the rejection, and re-changes the value of accept envido to false
  // Since its false, point will not be added again in another round because of the check in addEnvidoPoints

  if (envidoEnvidoCall) {
    myView.displayEnvidoTrucoEvents(`P2 rechazo el Envido Envido`);
    acceptEnvido = false;
    p1points += 2;
    p2buttonsDisabler();
    p2buttonColor();
    infoSlotP2.style.backgroundColor = "";
    infoSlotP2.style.borderColor = "";
  } else if (envidoCall) {
    myView.displayEnvidoTrucoEvents(`P2 rechazo el Envido`);
    acceptEnvido = false;
    p1points += 1;
    switchPlayer();
  }
});

// Game Rounds

const roundOne = function () {
  console.log("Round One Starts");

  // console.log(`current Player: ${currentPlayer}`);
  p1RoundChoice = 0;
  p2RoundChoice = 0;

  let roundOneTimer;
  currentRound = 1;

  //addEnvidoPoints is working good

  const checkRoundOne = function () {
    // Aca un if igual para detectar envido y truco
    if (p1RoundChoice !== 0 && p2RoundChoice !== 0 && currentRound === 1) {
      console.log("antes del envido points");
      addEnvidoPoints();
      console.log("despues del envido points");
      envidoCall = false;
      envidoEnvidoCall = false;
      console.log("despues de los camvbios de envido points");
      console.log(
        "cambio el current round a 2 antes de los switchs",
        currentRound,
        typeof currentRound
      );
      currentRound = 2;
      console.log(
        "cambio el current round a 2 antes de los switchs",
        currentRound,
        typeof currentRound
      );
      // console.log("Ya detecto las 2 cartas iguales");
      clearInterval(roundOneTimer);
      // Reinicio los botones de envido para poder usar aceptar y reject con truco

      let winner = checkRoundWinner(p1RoundChoice, p2RoundChoice);

      if (+winner === 3) {
        myView.displayRoundEvents(`* Empate en primera *`);
        p1roundsWon += 10;
        p2roundsWon += 10;
        roundTwo();
      }
      if (+winner === 1) {
        // console.log("el proximo round juega el P1");
        myView.displayRoundEvents(`* El Player 1 gano primera*`);
        console.log("donde hace este log");
        p1roundsWon++;
        roundTwo();
        checkRightPlayer(currentPlayer, p1);
        console.log("donde hace este segundo log");
      }
      if (+winner === 2) {
        // console.log("el proximo round juega el P2");
        myView.displayRoundEvents(`* El Player 2 gano primera*`);
        p2roundsWon++;
        roundTwo();
        checkRightPlayer(currentPlayer, p2);
      }
    }
  };
  // console.log("---------------------------------------------------------");
  // Assign the interval ID to roundOneTimer
  roundOneTimer = setInterval(checkRoundOne, 10);
  // Call the function to start checking variables
  checkRoundOne();
};

const roundTwo = function () {
  let roundTwoTimer;
  p1RoundChoice = 0;
  p2RoundChoice = 0;
  currentRound = 2;
  switchPlayer();
  switchPlayer();

  console.log("Round Two Starts");
  // console.log(`current Payer: ${currentPlayer}`);

  const checkRoundTwo = function () {
    if (p1RoundChoice !== 0 && p2RoundChoice !== 0 && currentRound === 2) {
      // console.log("Ya detecto las 2 cartas iguales");
      clearInterval(roundTwoTimer);
      let winner = checkRoundWinner(p1RoundChoice, p2RoundChoice);
      if (winner === 3) {
        p1roundsWon += 5;
        p2roundsWon += 5;
        roundThree();
      }
      if (winner === p1) {
        // console.log("el proximo round juega el P1");
        myView.displayRoundEvents(`** El Player 1 gano segunda **`);
        p1roundsWon++;
        checkRightPlayer(currentPlayer, p1);
        roundThree();
      }
      if (winner === p2) {
        // console.log("el proximo round juega el P2");
        myView.displayRoundEvents(`** El Player 2 gano segunda **`);
        p2roundsWon++;
        checkRightPlayer(currentPlayer, p2);
        roundThree();
      }
    }
  };

  // Assign the interval ID to roundOneTimer
  roundTwoTimer = setInterval(checkRoundTwo, 10);
  // Call the function to start checking variables
  checkRoundTwo();
};

const roundThree = function () {
  console.log("Round Three Starts");
  let roundThreeTimer;
  roundThree;
  p1RoundChoice = 0;
  p2RoundChoice = 0;
  currentRound = 3;

  //me falto 1 if, que sea cartas iguales en 3ra ronda, y gana el que gano 1er mano
  const checkRoundThree = function () {
    //console.log("Check Round Three Starts");

    if (p1RoundChoice !== 0 && p2RoundChoice !== 0 && currentRound === 3) {
      console.log("Ya detecto las 2 cartas iguales");
      clearInterval(roundThreeTimer);
      let winner = checkRoundWinner(p1RoundChoice, p2RoundChoice);
      if (winner === 3) {
        console.log(`Gana el Player:${currentPlayer}`);
        console.log("Round Three ends");
        myView.displayGamesEvents(
          `*** El Player${currentPlayer} gano tercera`,
          currentPlayer
        );

        if (currentPlayer === 1) {
          p1points += roundpoints();
        } else {
          p2points += roundpoints();
        }

        nextRound();
      }
      if (winner === p1) {
        console.log("Gana el Player: 1");
        console.log("Round Three ends");
        myView.displayRoundEvents(`*** El Player 1 gano tercera ***`);
        myView.displayGamesEvents("*** El Player 1 gano en tercera ***", 1);
        p1points += roundpoints();
        nextRound();
      }
      if (winner === p2) {
        console.log("Gana el Player: 2");
        console.log("Round Three ends");
        myView.displayRoundEvents(`*** El Player 2 gano tercera ***`);
        myView.displayGamesEvents("*** El Player 2 gano en tercera ***", 2);
        p2points += roundpoints();
        nextRound();
      }
    }
  };

  // Assign the interval ID to roundOneTimer
  roundThreeTimer = setInterval(checkRoundThree, 10);
  // Call the function to start checking variables

  //console.log(`Points P1: "${p1roundsWon}", Points P2: "${p2roundsWon}"`);

  //console.log(`current Player: ${currentPlayer}`);
  if (p1roundsWon === 0 || p2roundsWon === 0) {
    // Algun player no gano ninguno de los 2 rounds, game over
    // Call nextround()
    p1roundsWon > p2roundsWon
      ? myView.displayRoundEvents(`** El Player 1 gano en segunda **`)
      : myView.displayRoundEvents(`** El Player 2 gano en segunda **`);
    //console.log("Ya no metio ningun punto y perdio los 2 rounds");

    p1roundsWon > p2roundsWon
      ? myView.displayGamesEvents(`** El Player 1 gano en segunda **`, 1)
      : myView.displayGamesEvents(`** El Player 2 gano en segunda **`, 2);

    p1roundsWon > p2roundsWon
      ? (p1points += roundpoints())
      : (p2points += roundpoints());

    clearInterval(roundThreeTimer);

    nextRound();
  }

  if (p1roundsWon === 11 || p2roundsWon === 11) {
    // Gano el round 1 pero empato el 2 do, game over
    // Call nextround()
    p1roundsWon > p2roundsWon
      ? console.log("gano el p1")
      : console.log(" gano el p2");
    console.log("Empate en round 1 y desempate en el 2, termina el round");
    myView.displayRoundEvents(
      p1roundsWon > p2roundsWon
        ? "** El Player 1 gano en segunda **"
        : "** El Player 2 gano en segunda **"
    );

    p1roundsWon > p2roundsWon
      ? myView.displayGamesEvents(`** El Player 1 gano en segunda **`, 1)
      : myView.displayGamesEvents(`** El Player 2 gano en segunda **`, 2);

    p1roundsWon > p2roundsWon
      ? (p1points += roundpoints())
      : (p2points += roundpoints());

    clearInterval(roundThreeTimer);

    nextRound();
  }

  if (p1roundsWon === 6 || p2roundsWon === 6) {
    // Empate en el 1er round, pero alguien gano el 2do, game over
    // Call nextround()
    p1roundsWon > p2roundsWon
      ? console.log("gano el p1")
      : console.log(" gano el p2");
    console.log("Gano el round 1 pero empato el 2 do, terminando el round");
    myView.displayRoundEvents(
      p1roundsWon > p2roundsWon
        ? "** El Player 1 gano en segunda **"
        : "** El Player 2 gano en segunda **"
    );

    p1roundsWon > p2roundsWon
      ? myView.displayGamesEvents(`** El Player 1 gano en segunda **`, 1)
      : myView.displayGamesEvents(`** El Player 2 gano en segunda **`, 2);

    p1roundsWon > p2roundsWon
      ? (p1points += roundpoints())
      : (p2points += roundpoints());

    clearInterval(roundThreeTimer);

    nextRound();
  }

  if (p1roundsWon === 1 && p2roundsWon === 1) {
    // Cada uno gano un round, juego round 3
    console.log("Cada uno gano 1 round, go round 3");
    checkRoundThree();
  }

  if (p1roundsWon === 15 && p2roundsWon === 15) {
    // Empates en round 1 y 2, jugar round 3 y desempate
    // En caso de empate en round 3.. gana el active player
    console.log("Empates en round 1 y 2, go round 3");
    checkRoundThree();
  }
};

// Buttons Listeners

newGame();
btnNewGame.addEventListener("click", function () {
  window.location.reload();
});

// TODO Aceptar truco en 1ra, tmb hace que se acepte envido de nuevo, si fue cantado antes

// Un contador.. puede ser con un timer 1ves por segundo para que no haga falta spam, que revise si el score de p1 o p2 es === 15, si en lagun momento es igual a 15, ese player gano.. puedo hacer aparecer algun modal window, y que te haga empezar un round nuevo

// TODO Mejorar la UI
// Seleccionar Font, ajustar tamaños, colores
// Acomodar margins // paddins
// Cambiar diseño de botones cuando estan disabled
