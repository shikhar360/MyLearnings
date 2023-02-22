/*

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";

const Counter = () => {
  const [amount, setAmount] = useState<number>(0);

  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <section>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
      <button
        onClick={() => {
          dispatch(reset());
          setAmount(0);
        }}
      >
        ----RESET-------
      </button>

      <div>
        <input
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(+e.target.value)
          }
          value={amount}
        />
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Add BY
        </button>
      </div>
    </section>
  );
};

export default Counter;

*/



//Not used in this project
// export const useAppDispatch: () => AppDispatch = useDispatch                
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector   ---  (import from react-redux)
