import { drawFood, updateFood } from './food.js';
import { SNAKE_SPEED, SNAKE_HEAD, updateSnake, drawSnake, snakeIntersection } from './snake.js';
import { isOutsideGrid } from './grid.js';

const gameBoard = document.getElementById('game-board');
let lastRenderTime = 0;
let gameOver = false;

// currentTime is in milliseconds
function main(currentTime) {
    if(gameOver){
        if(confirm('You lost. Press ok to restart')) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // calculate if we need to move
    if (secondSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    // updates the logic in the game
    update();
    // updates based in the update();
    draw();
}

function checkGameOver() {
    gameOver = isOutsideGrid(SNAKE_HEAD) || snakeIntersection();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkGameOver();
}

function draw() {
    // clean previous pieces, where the snake passed by
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
