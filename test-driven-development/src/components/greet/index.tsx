import React from 'react'

interface GreetProp{
  name? : string
}

export default function Greet({name}:GreetProp) {
  return (
    <div>Hello world {name}</div>
  )
}
