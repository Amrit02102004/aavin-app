import React from 'react'

const Button = ({onClick, text}) => {
  return (
    <div>
      <button className="" onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button