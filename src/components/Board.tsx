import { useCallback, useEffect, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "../const"
import Cell from "./Cell"
import './components.css'
import randomTetronimo from "../utils/randomTetronimo"
import Button from "./Button"
import { canGoDown } from "../utils/checkMove"

type Props = {}
type TetronimoPos = {
  x: number,
  y: number
}

function Board({}: Props) {
  const [grid, setGrid] = useState<number[][]>([]);
  const [currentTetronimo, setCurrentTetronimo] = useState<number[][]>([])
  const [nextTetronimo, setNextTetronimo] = useState<number[][]>([])
  const [tetronimoPos, setTetronimoPos] = useState<TetronimoPos>({ x: 0, y: 0 })
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [isGameActive, setIsGameActive] = useState<boolean>(false)

  const createNewGrid = () => {
        return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0))
    } 

        const mergeTetronimoIntoGrid = (grid: number[][], shape: number[][], posX: number, posY: number) => {
      const newGrid = grid.map(row => [...row])
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[0].length; col++) {
          if (shape[row][col]) {
            const y = posY + row;
            const x = posX + col;

            if (y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH) {
              newGrid[y][x] = 1
            }
          }
        }
      }

      return newGrid
    }

    const startGame = useCallback(() => {
        setIsGameActive(true)
        const tetronimo = randomTetronimo();
        setCurrentTetronimo(tetronimo);
        setNextTetronimo(randomTetronimo())
        setTetronimoPos({ x: 0, y: 0 })
        const emptyGrid = createNewGrid();
    }, [createNewGrid]);

    useEffect(() => {
      const grid = createNewGrid();
      setGrid(grid);
    }, [])

    const isPartOfFallingTetronimo = useCallback((row: number, col: number, shape: number[][], posX: number, posY: number) => {
      const originRow = row - posY
      const originCol = col - posX

      if (
        originRow >= 0 &&
        originRow < shape.length &&
        originCol >= 0 &&
        originCol < shape[0].length
      ) {
        return shape[originRow][originCol] === 1
      }
      return false
    }, [])

    useEffect(() => {
      if (!isGameActive) return;
      const gameLoop = setTimeout(() => {
        // const nextY = tetronimoPos.y + 1
        if (canGoDown(grid, currentTetronimo, tetronimoPos.x, tetronimoPos.y)) {
          setTetronimoPos(prev => ({ ...prev, y: tetronimoPos.y + 1 }))
        }
        else {
          const lockedGrid = mergeTetronimoIntoGrid(grid, currentTetronimo, tetronimoPos.x, tetronimoPos.y)
          setGrid(lockedGrid)

          const newShape = nextTetronimo
          const nextNewShape = randomTetronimo()

          setCurrentTetronimo(newShape);
          setNextTetronimo(nextNewShape)
          setTetronimoPos({ x: 0, y: 0 })

          if (canGoDown(lockedGrid, newShape, tetronimoPos.x, tetronimoPos.y)) {
            console.log('Game over')
            setIsGameActive(false)
          }
        }
      }, 1000)

      return () => clearTimeout(gameLoop)
    }, [isGameActive, tetronimoPos, currentTetronimo, grid, nextTetronimo, canGoDown, mergeTetronimoIntoGrid])

    //     const gridWithTetronimo = moveTetronimo(emptyGrid, tetronimo, 0, 0);
    //     setGrid(gridWithTetronimo);
    //      if (intervalId) {
    //         clearInterval(intervalId)
    //       }

    //       const dropInterval = setInterval(() => {
    //         if (canGoDown(grid, tetronimo, tetronimoPos.x, tetronimoPos.y)) {
    //           setTetronimoPos(prev => {
    //             const newY = prev.y + 1;
    //             const newGrid = moveTetronimo(createNewGrid(), tetronimo, prev.x, newY)
    //             setGrid(newGrid)
    //             console.log(`Adjusted coords: ${JSON.stringify({ ...prev, y: newY })}`)
    //             return { ...prev, y: newY }
    //         })
    //         }
    //         else {
    //           const lockedGrid = mergeTetronimoIntoGrid(grid, tetronimo, tetronimoPos.x, tetronimoPos.y)
    //           setGrid(lockedGrid)
    //           const newShape = randomTetronimo();
    //           setNextTetronimo(newShape);
    //           setTetronimoPos({ x: 0, y: 0 })
    //         }
    //         console.log(`PosX: ${tetronimoPos.x} and PosY: ${tetronimoPos.y}`)
    //       }, 1000)
          
    //       setIntervalId(dropInterval)
    // };

    useEffect(() => {
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, [intervalId]);

    const moveTetronimo = (grid: number[][], shape: number[][], posX: number, posY: number) => {
      const newGrid = grid.map(row => [...row])
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[0].length; col++) {
          if (shape[row][col] === 1) {
            const newX = posX + col;
            const newY = posY + row;

            if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT) {
              newGrid[newY][newX] = 1
            }
          }
        }
      }
      setGrid(newGrid)
      return newGrid
    }



  return (
    <div id="game-container">
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    <Cell 
                        key={`${rowIndex}-${colIndex}`}
                        isOccupied={cell !== 0 || isPartOfFallingTetronimo(rowIndex, colIndex, currentTetronimo, tetronimoPos.x, tetronimoPos.y)}
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