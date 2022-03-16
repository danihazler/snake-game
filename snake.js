import { getInputDirection } from "./input.js";

const plyrPoints = document.querySelector(".player-points");
const plyrLevel = document.querySelector(".player-level");
let level = 1;
let points = 0;
let newSegments = 0;
const snakeBody = [{ x: 11, y: 11 }];
// SNAKE_SPEED how many times the snake moves per second
export let SNAKE_SPEED = 5;
export const SNAKE_HEAD = snakeBody[0];

export function updateSnake() {
  addSegments();
  const direction = getInputDirection();
  // loop through all segments apart from the last one
  // because essentially the last one will just disappear
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  // move the head
  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;
}

export function drawSnake(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeSegment = document.createElement("div");
    snakeSegment.classList.add("snake");
    snakeSegment.style.gridRowStart = segment.y;
    snakeSegment.style.gridColumnStart = segment.x;
    gameBoard.appendChild(snakeSegment);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
  plyrPoints.innerHTML = points += 1;
  updateGameInfo();
}

export function updateGameInfo() {
  // update info every 10 points
  if (points % 10 === 0) {
    plyrLevel.innerHTML = level += 1;
    return (SNAKE_SPEED += 2);
  }
  return;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    // loop throught every snake's segment 
    // to check if the position matchs with the food
    return snakeBody.some((segment, index) => {
        // cause of snakeIntersection() we need this extra check
        // ignore the head otherwise this function will always return true
        if(ignoreHead && index === 0) return false;

        return segment.x === position.x && segment.y === position.y;
    })
}

// checks the head against any other part of snake
export function snakeIntersection() {
    return onSnake(SNAKE_HEAD, { ignoreHead: true })
}

function addSegments() {
    for(let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length -1 ]})
    }
    // make sure the snake grows only the necessary
    newSegments = 0;
}