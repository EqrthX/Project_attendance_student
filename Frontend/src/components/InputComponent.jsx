import React from 'react'

const InputComponent = (props) => {
  return (
    <input
        {...props}
    >
      {props.children}
    </input>
  )
}

export default InputComponent
