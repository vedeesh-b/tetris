import './components.css'

type ButtonProps = {
  onClick: React.MouseEventHandler
}

function Button( { onClick }: ButtonProps ) {
  return (
    <button onClick={onClick}>Start</button>
  )
}

export default Button