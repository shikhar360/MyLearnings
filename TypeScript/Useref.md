```js

// ---------------------------------------------------------
 // How to use MultipleRefs 
// ---------------------------------------------------------
import { useRef, useState } from "react";
import CustomInputButton from "./MyComponent";

export default function Home() {
  // const inputRef = useRef<HTMLInputElement>(null);
  // const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick(e: React.SyntheticEvent) {
    console.log(refs.inputRef.current);
    console.log(refs.buttonRef.current);

    if (!refs.buttonRef.current) return;

    refs.inputRef.current?.focus();
    refs.buttonRef.current.style.width = "200px";
    refs.buttonRef.current.style.backgroundColor = "yellow";
  }

  const refs = {
    inputRef: useRef<HTMLInputElement>(null),
    buttonRef: useRef<HTMLButtonElement>(null),
  };

  return (
    <div className="flex flex-col bg-blue-500 items-center justify-center w-full min-h-screen">
      <button onClick={handleClick}>Clickme</button>

      <CustomInputButton {...refs} />
    </div>
  );
}

    // ---------------------------------------------------------
     // In the Children Component 
    // ---------------------------------------------------------


import React from 'react'
import { forwardRef, RefObject } from 'react';


interface InputButtonRefs {
  inputRef: RefObject<HTMLInputElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}

const CustomInputButton = forwardRef< {}, InputButtonRefs>(

  ({inputRef ,buttonRef }, ref) => {

    return (
      <>
        <input ref={inputRef} type="text" />
        <button ref={buttonRef}>I am going to be modified</button>
      </>
    );
  }
);

export default CustomInputButton

```