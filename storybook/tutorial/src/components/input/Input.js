import React from 'react'
import "./Input.css"

export default function Input({variant = "small" , children , ...rest}) {
  return (
    <input type="text" className={`input ${variant}`}{...rest}/>
  )
}
