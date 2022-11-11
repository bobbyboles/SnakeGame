let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext('2d');
let scoreIs = document.getElementById("score");
let pauseButtonElement = document.getElementById('pauseButton');
let unpauseButtonElement = document.getElementById('unpauseButton');

const displaySpace = document.getElementById("displaySpace");
const displaySpace2 = document.getElementById("displaySpace2");

/*  HOW TO DRAW...

  ctx.beginPath();
  ctx.closePath();

*/

/*      ~THINGS TO DO~

  -overTheSelf detector
  -endGame

          ~optional~
  -start button
  -pause button
  -unpause button

*/

let score = 50;

let cookieX;
let cookieY;
let isCookie = false;

let iterateSpeed = 100;
let interval;
let currentDirection = "up";
//the height and width of each box
let snakeSize = 10;
//three boxes big
let snakeLength = 4;
let snakeStartX = 200-snakeSize;
let snakeStartY = 200-snakeSize;

// Snake tracking array
let snakeX = [];
let snakeY = [];

let onOff;
let directionLock;


pauseButtonElement.addEventListener('click', pauseButton);
unpauseButtonElement.addEventListener('click', unpauseButton);

document.addEventListener('keydown', (e) => {
    if ((e.code === "ArrowDown" || e.code === "KeyS") && directionLock !== "up") {
      currentDirection = "down";
    } else if ((e.code === "ArrowUp" || e.code === "KeyW") && directionLock !== "down") {
      currentDirection = "up";
    } else if ((e.code === "ArrowRight" || e.code === "KeyD") && directionLock !== "left") {
      currentDirection = "right";
    } else if ((e.code === "ArrowLeft" || e.code === "KeyA") && directionLock !== "right") {
      currentDirection = "left";
    }
});


function trackSnake() {
    snakeX.unshift(snakeStartX);
    snakeY.unshift(snakeStartY);
    if (snakeX.length > snakeLength+1 || snakeY.length > snakeLength+1) {
        snakeX.pop();
        snakeY.pop();
    }
    displaySpace.innerHTML = 'Snake X: ' + snakeX;
    displaySpace2.innerHTML = 'Snake Y: ' + snakeY;
}


function clearSnake() {
    if (snakeX[snakeLength-2] || snakeX[snakeLength-2] === 0) {
        ctx.clearRect(snakeX[snakeLength-2], snakeY[snakeLength-2], snakeSize, snakeSize);
    }
}

// Draw snake
function drawSnake() {
    ctx.beginPath();
    ctx.fillRect(snakeStartX, snakeStartY, snakeSize, snakeSize);
    ctx.closePath();
}

function moveSnake() {
    if (currentDirection === "up") {
        snakeStartY -= snakeSize;
    } else if (currentDirection === "down") {
        snakeStartY += snakeSize;
    } else if (currentDirection === "left") {
        snakeStartX -= snakeSize;
    } else if (currentDirection === "right") {
        snakeStartX += snakeSize;
    }
}

function overTheEdgeDetector() {
    if(snakeX[0] >= 400 || snakeX[0] <= 0 || snakeY[0] >= 400 || snakeY[0] <= 0){
      endGame();
    }
}

function updateScore() {
    scoreIs.innerHTML = "Score: " + score;
}

function iterate() {
    clearSnake();
    trackSnake();
    moveSnake();
    overTheEdgeDetector();
    cookieGenerator();
    drawCookie();
    eatCookie();
    updateScore();
    drawSnake();
    directionLock = currentDirection;
}

function endGame() {
    displaySpace.style.backgroundColor = 'red';
}

function gameStart() {
    // setInterval(functionName, iterationSpeedInMilliseconds)
    interval = setInterval(iterate, iterateSpeed);
}

function cookieGenerator() {
  if (!isCookie) {
    cookieX = (Math.floor(Math.random() * (400/snakeSize)) * snakeSize);
    cookieY = (Math.floor(Math.random() * (400/snakeSize)) * snakeSize);
    for (let i=0;i<snakeLength-1;i++) {
      if (cookieX === snakeX[i] && cookieY === snakeY[i]) {
        console.log("cookie tried to spawn in snake");
        cookieGenerator();
      } else {
        isCookie = true;
      }
    }
  }
}

function drawCookie() {
  ctx.beginPath();
  ctx.fillRect(cookieX, cookieY, snakeSize, snakeSize);
  ctx.closePath();
}

function eatCookie() {
    if (snakeStartX === cookieX && snakeStartY === cookieY) {
      snakeLength += 1;
      score += 10;
      isCookie = false;
    }
}


function pauseButton() {
    onOff = false;
    clearInterval(interval);
}

function unpauseButton() {
    if (!onOff) {
        onOff = true;
        interval = setInterval(iterate, iterateSpeed);
    }
}

gameStart();

