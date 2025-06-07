import { GRID_HEIGHT, GRID_WIDTH } from "../const";

export function canGoDown( grid: number[][], shape: number[][], posX: number, posY: number ) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[0].length; col++) {
            if (shape[row][col] === 1) {
                const nextY = row + posY + 1;
                const newX = col + posX;
                if (
                    nextY >= GRID_HEIGHT ||
                    newX < 0 || newX >= GRID_WIDTH ||
                    grid[nextY][newX] !== 0
                ) {
                    return false
                }
            }
        }
    }
    return true
}

export function canGoLeft( shape: number[][], posX: number ) {
    for (let col = 0; col < shape[0].length; col++) {
        for (let row = 0; row < shape.length; row++) {
            if (shape[row][col] === 1) {
                return posX + col >= 1
            }
        }
    }
    return true
}

export function canGoRight( shape: number[][], posX: number ) {
    for (let col = shape[0].length; col > 0; col--) {
        for (let row = shape.length; row > 0; row--) {
            if (shape[row][col] === 1) {
                return posX + col < GRID_WIDTH - 1;
            }
        }
    }
    return true
}