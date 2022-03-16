import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

// how much the snake grows when it eats the food
const EXPANSION_RATE = 1;
let foodPosition = getRandomFoodPosition();

export function updateFood() {
    if(onSnake(foodPosition)) {
        expandSnake(EXPANSION_RATE);
        //set food to new position
        foodPosition = getRandomFoodPosition();
    }
}

export function drawFood(gameBoard) {
    const food = document.createElement('div');
    food.classList.add('food');
    food.style.gridRowStart = foodPosition.y;
    food.style.gridColumnStart = foodPosition.x;
    gameBoard.appendChild(food);
}

function getRandomFoodPosition() {
    let newFoodPosition;

    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}