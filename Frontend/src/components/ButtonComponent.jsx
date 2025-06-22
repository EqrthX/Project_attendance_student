import React from 'react'

const ButtonComponent = (props) => {
  return (
    <button
        {...props}
    >
      {props.children}
    </button>
  )
}

export default ButtonComponent
