// board

let blockSize = 25;
let rows = 20;
let cols = 20;
let score = 0;
let scoreText;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let moveX = 0;
let moveY = 0;

let snakeBody = [];

// food
let foodX;
let foodY;

// Game Over
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  scoreText = document.getElementById("scores");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "silver";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([snakeX, snakeY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "yellow";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  snakeX += moveX * blockSize;
  snakeY += moveY * blockSize;
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  //Game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("gameOver");
    }
  }
}
function changeDirection(e) {
  if (e.code == "ArrowUp" && moveY != 1) {
    moveX = 0;
    moveY = -1;
  } else if (e.code == "ArrowDown" && moveY != -1) {
    moveX = 0;
    moveY = 1;
  } else if (e.code == "ArrowLeft" && moveX != 1) {
    moveX = -1;
    moveY = 0;
  } else if (e.code == "ArrowRight" && moveX != -1) {
    moveX = 1;
    moveY = 0;
  }
}
function placeFood() {
  // 0-1 * cols -> (0-19.9999) -> (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
