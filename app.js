let snake = {
  body: [
    [10, 0],
    [10, 1],
    [10, 2],
    [10, 3],
  ],
  nextDirection: [0, 1],
  direction: "right",
  checkWhichDirection: "right",
  point: null,
  createPoint: false,
  grow: 0,
  score: 0,
  highScore: 0,
  toggleSettingsMenu: false,
  toggleGrid: true,
};

const gameDisplay = document.getElementById("game-display");
const currentScore = document.getElementById("current-score");
const highScore = document.getElementById("high-score");
const mobileLeft = document.getElementById("mobile-left");
const mobileRight = document.getElementById("mobile-right");
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings");
const gridSetting = document.getElementById("grid-checkbox");

//DOM for changing settings
settingsMenu.style.display = "none";

let checkStateHighScore = localStorage.getItem("snakeHighScore");

if (checkStateHighScore) {
  snake.highScore = parseInt(checkStateHighScore);
  highScore.innerHTML = `High Score: ${snake.highScore}`;
}

document.addEventListener("keydown", checkKey);

// allows for web page to not move on key click

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

mobileLeft.addEventListener("click", mobileLeftClick);
mobileRight.addEventListener("click", mobileRightClick);
settingsButton.addEventListener("click", toggleSettingsMenu);
gridSetting.addEventListener("click", toggleGridSetting);

function renderGrid() {
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("id", `${i}-${j}`);
      cell.style.outline = "solid 1px black";
      gameDisplay.appendChild(cell);
    }
  }
}

function gameStart() {
  for (let i = 0; i < snake.body.length; i++) {
    const cell = document.getElementById(
      `${snake.body[i][0]}-${snake.body[i][1]}`
    );
    cell.style.backgroundColor = "black";
  }
}

function createPoint() {
  let pointCheck = false;

  while (!pointCheck) {
    let randomVertical = Math.floor(Math.random() * 37) + 1;
    let randomHorizontal = Math.floor(Math.random() * 37) + 1;
    let uniqueCell = true;

    for (let i = 0; i < snake.body.length; i++) {
      if (
        randomVertical === snake.body[i][0] &&
        randomHorizontal === snake.body[i][1]
      ) {
        uniqueCell = false;
        break;
      }
    }

    if (uniqueCell) {
      snake.point = [randomVertical, randomHorizontal];

      const cell = document.getElementById(
        `${randomVertical}-${randomHorizontal}`
      );
      cell.style.backgroundColor = "red";
      pointCheck = true;
    }
  }
}

function boardClear() {
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      cell.style.removeProperty("background-color");
    }
  }
}

function resetGameState() {
  snake.body = [
    [10, 0],
    [10, 1],
    [10, 2],
    [10, 3],
  ];
  snake.nextDirection = [0, 1];
  snake.direction = "right";
  snake.checkWhichDirection = "right";
  snake.point = null;
  snake.score = 0;

  currentScore.innerHTML = `Score: ${snake.score}`;
}

renderGrid();
gameStart();
createPoint();

// Desktop Controls
function checkKey(e) {
  if (e.key === "ArrowUp") {
    // Up
    if (snake.checkWhichDirection != "down") {
      snake.direction = "up";
      snake.nextDirection = [-1, 0];
    }
  } else if (e.key === "ArrowDown") {
    // Down
    if (snake.checkWhichDirection != "up") {
      snake.direction = "down";
      snake.nextDirection = [1, 0];
    }
  } else if (e.key === "ArrowLeft") {
    // Left
    if (snake.checkWhichDirection != "right") {
      snake.direction = "left";
      snake.nextDirection = [0, -1];
    }
  } else if (e.key === "ArrowRight") {
    // Right
    if (snake.checkWhichDirection != "left") {
      snake.direction = "right";
      snake.nextDirection = [0, 1];
    }
  }
}

// Mobile Controls
function mobileLeftClick() {
  if (snake.checkWhichDirection === "up") {
    snake.direction === "left";
    snake.nextDirection = [0, -1];
  } else if (snake.checkWhichDirection === "right") {
    snake.direction === "up";
    snake.nextDirection = [-1, 0];
  } else if (snake.checkWhichDirection === "down") {
    snake.direction === "right";
    snake.nextDirection = [0, 1];
  } else if (snake.checkWhichDirection === "left") {
    snake.direction === "down";
    snake.nextDirection = [1, 0];
  }
}

function mobileRightClick() {
  if (snake.checkWhichDirection === "up") {
    snake.direction === "right";
    snake.nextDirection = [0, 1];
  } else if (snake.checkWhichDirection === "right") {
    snake.direction === "down";
    snake.nextDirection = [1, 0];
  } else if (snake.checkWhichDirection === "down") {
    snake.direction === "left";
    snake.nextDirection = [0, -1];
  } else if (snake.checkWhichDirection === "left") {
    snake.direction === "up";
    snake.nextDirection = [-1, 0];
  }
}

//Settings functions
function toggleSettingsMenu() {
  console.log(settingsMenu);
  if (!snake.toggleSettingsMenu) {
    settingsMenu.style.removeProperty("display");
    snake.toggleSettingsMenu = true;
  } else {
    settingsMenu.style.display = "none";
    snake.toggleSettingsMenu = false;
  }
}

function toggleGridSetting() {
  if (snake.toggleGrid) {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        const cell = document.getElementById(`${i}-${j}`);
        cell.style.removeProperty("outline");
      }
    }
    snake.toggleGrid = false;
  } else {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        const cell = document.getElementById(`${i}-${j}`);
        cell.style.outline = "solid 1px black";
      }
    }
    snake.toggleGrid = true;
  }
}

setInterval(() => {
  let head = snake.body[snake.body.length - 1];
  let verticalValue = head[0];
  let horizontalValue = head[1];
  verticalValue += snake.nextDirection[0];
  horizontalValue += snake.nextDirection[1];

  if (
    verticalValue > 39 ||
    verticalValue < 0 ||
    horizontalValue > 39 ||
    horizontalValue < 0
  ) {
    boardClear();
    resetGameState();
    gameStart();
    createPoint();
  } else {
    let uniqueCell = true;

    for (let i = 0; i < snake.body.length; i++) {
      if (
        verticalValue === snake.body[i][0] &&
        horizontalValue === snake.body[i][1]
      ) {
        uniqueCell = false;
        break;
      }
    }

    if (uniqueCell) {
      if (snake.nextDirection[0] === 1) {
        snake.checkWhichDirection = "down";
      } else if (snake.nextDirection[0] === -1) {
        snake.checkWhichDirection = "up";
      } else if (snake.nextDirection[1] === 1) {
        snake.checkWhichDirection = "right";
      } else if (snake.nextDirection[1] === -1) {
        snake.checkWhichDirection = "left";
      }

      if (
        verticalValue === snake.point[0] &&
        horizontalValue === snake.point[1]
      ) {
        snake.score += 50;

        if (snake.score > snake.highScore) {
          snake.highScore = snake.score;
        }

        currentScore.innerHTML = `Score: ${snake.score}`;
        highScore.innerHTML = `High Score: ${snake.highScore}`;
        localStorage.setItem("snakeHighScore", snake.highScore);
        snake.grow = 2;
      }

      let cell = document.getElementById(`${verticalValue}-${horizontalValue}`);
      cell.style.backgroundColor = "black";
      snake.body.push([verticalValue, horizontalValue]);

      if (snake.grow) {
        if (snake.grow === 1) {
          snake.createPoint = true;
        }
        snake.grow--;
      } else {
        let removedCell = snake.body.shift();
        const cell2 = document.getElementById(
          `${removedCell[0]}-${removedCell[1]}`
        );
        cell2.style.removeProperty("background-color");
        if (snake.createPoint === true) {
          createPoint();
          snake.createPoint = false;
        }
      }
    } else {
      boardClear();
      resetGameState();
      gameStart();
      createPoint();
    }
  }
}, 50);
