import React, { useCallback } from 'react'

export function useCounter() {
 const [count, setCount] = React.useState(0)

 const increment = useCallback(() => setCount(prev => prev + 1),[])

 const decrement = useCallback(() => setCount(prev => prev -  1),[])

 const reset = useCallback(() => setCount(0),[])

 return {count , increment , decrement , reset}
}
