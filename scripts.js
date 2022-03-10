let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let playerTurn = "";
let warning = "";
let playing = false;

$("button.reset").click(reset);
$(".item").click(function () {
  let item = this.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = playerTurn;
    renderSquare();
    togglePlayer();
  }
});

function togglePlayer() {
  playerTurn = playerTurn === "X" ? "O" : "X";
  renderInfo();
}

function reset() {
  warning = "";

  let randomGameKey = Math.floor(Math.random() * 2);
  playerTurn = randomGameKey === 0 ? "X" : "O";

  for (let i in square) {
    square[i] = "";
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (let i in square) {
    let item = $(`div[data-item=${i}]`);
    item.html(square[i]);
  }
  checkGame();
}

function checkGame() {
  if (checkWinnerFor("X")) {
    warning = `Jogador ${playerTurn}`;
    playing = false;
  } else if (checkWinnerFor("O")) {
    warning = `Jogador ${playerTurn}`;
    playing = false;
  } else if (isFull()) {
    warning = "Empate";
    playing = false;
  }
}

function renderInfo() {
  $(".vez").html(`Jogador  ${playerTurn}`);
  $(".resultado").html(warning);
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let p in pos) {
    let posArray = pos[p].split(",");
    let hasWon = posArray.every((option) => square[option] === player);
    if (hasWon) {
      return true;
    }
  }

  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }

  return true;
}

reset();
