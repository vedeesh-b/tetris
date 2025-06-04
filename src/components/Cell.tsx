import './components.css'

type CellProps = {
    isOccupied: boolean,
    index: string
}

function Cell({ isOccupied, index }: CellProps) {
  return (
    <div 
        className="cell-container" 
        id={index}
    />
  )
}

export default Cell