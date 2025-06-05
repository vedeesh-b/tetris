import { useEffect, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "../const"
import Cell from "./Cell"
import './components.css'
import randomTetronimo from "../utils/randomTetronimo"
import Button from "./Button"

type Props = {}

function Board({}: Props) {
  const [grid, setGrid] = useState<number[][]>([]);
  const [nextTetronimo, setNextTetronimo] = useState<number[][]>([])

  const createNewGrid = () => {
        return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0))
    } 

    const startGame = () => {
        const tetronimo = randomTetronimo();
        setNextTetronimo(tetronimo);
        const emptyGrid = createNewGrid();
        const gridWithTetronimo = placeTetronimo(emptyGrid, tetronimo);
        setGrid(gridWithTetronimo);
    };

    const placeTetronimo = (grid: number[][], shape: number[][]) => {
        const newGrid = grid.map(row => [...row]);
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    newGrid[row][col] = 1;
                }
            }
        }
        return newGrid;
    };


  useEffect(() => {
    const grid = createNewGrid();
    setGrid(grid);
  }, [])

  return (
    <div id="game-container">
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    <Cell 
                        key={`${rowIndex}-${colIndex}`}
                        isOccupied={cell !== 0}
                        index={(rowIndex * 10 + colIndex).toString()}
                    />
                )
            )}
        </div>
        <Button onClick={() => startGame()} />
    </div>
  )
}

export default Board