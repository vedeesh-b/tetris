import { useEffect, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "../const"
import Cell from "./Cell"
import './components.css'

type Props = {}

function Board({}: Props) {
  const [grid, setGrid] = useState<number[][]>([]);  

  const createNewGrid = () => {
    return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0))
  } 

  useEffect(() => {
    const grid = createNewGrid();
    setGrid(grid);
  }, [])

  return (
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
  )
}

export default Board