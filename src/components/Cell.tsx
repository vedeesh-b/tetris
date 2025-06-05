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
        style={isOccupied ? { backgroundColor: '#000'} : { backgroundColor: '#242424' }}
    />
  )
}

export default Cell