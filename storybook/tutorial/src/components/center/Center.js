import React from 'react'

export default function Center(props) {
  return (
    <div style={{
      display : "flex",
     width : "100%",
      justifyContent : "center"
    }}>{props.children}</div>
  )
}
