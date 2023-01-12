import {useCounter} from "../Counter";
import { renderHook , act } from "@testing-library/react";

describe("useCounter group" , ()=>{

  test("should increase the counter", async()=>{
  const {result} = renderHook(()=> useCounter())
  
    act(()=>{
      result.current.increment() 
      result.current.increment() 
      result.current.increment() 
      result.current.increment() 
      result.current.decrement()
     
    })
  
    expect(result.current.count).toBe(3)
  })
  
  test("should decrease the counter " , ()=>{
    const {result} = renderHook(()=> useCounter())
  
    act(()=>{
      result.current.decrement()
  
    })
  
    expect(result.current.count).toBe(-1)
  })

})
