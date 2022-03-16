// same we size we added on css
const GRID_SIZE = 21;

/**
 *  REMEMBER display grid starts at 1, so in our case our grid 
 * is from 1 to 21, 0 would be outside the grid
*/
export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1,
    }
};

export function isOutsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE 
    );
};