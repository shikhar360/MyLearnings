import React from 'react'
import "./Button.css"

export default function Button(/*props*/{variant  = "primary" , children , ...rest}) {
  return (
   <button className={`button ${variant}`}  {...rest}>{children}</button>
  )
}
