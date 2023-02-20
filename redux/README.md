# REDUX
Redux is a library for managing the state of your application. It is often used in combination with React, but can also be used with other JavaScript frameworks or even vanilla JavaScript. In this tutorial, we will be using Redux with a React application.

Step 1: Install the dependencies
To start using Redux in your project, you will need to install the redux and react-redux libraries. You can do this by running the following command in your terminal:

```js
npm install redux react-redux
```

Step 2: Define the store

The first thing you need to do when using Redux is to define your store. The store is where your application's state is stored and updated. You can create a store by calling the createStore function from the redux library, and passing in a reducer function. The reducer function is responsible for handling actions and updating the state.

Here is an example of how to create a store with an initial state of { count: 0 } and a simple reducer that handles INCREMENT and DECREMENT actions:

```js
import { createStore } from 'redux';

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  } else if (action.type === 'DECREMENT') {
    return { count: state.count - 1 };
  } else {
    return state;
  }
}

const store = createStore(reducer);

export default store;

```

Step 3: Connect your components to the store

To make your components aware of the state in the store and able to dispatch actions, you will need to use the connect function from the react-redux library. This function allows you to map the state from the store to props in your component, and map dispatch functions to props that can be used to dispatch actions.

Here is an example of how to use the connect function to connect a simple Counter component to the store:

```js
import { connect } from 'react-redux';

const Counter = ({ count, increment, decrement }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' })
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

Step 4: Render the component

To render the component, you will need to wrap it with the <Provider> component from the react-redux library, and pass in the store as a prop. This allows your connected components to access the store and the state.

Here is an example of how to render the Counter component:


# Redux Toolkit

```js

//configure store

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// create slice
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});







```
useSelector is a hook provided by the react-redux library that allows a React component to select and read data from the Redux store. It provides an easy way to access the store's state without having to write custom mapping functions .


```js
import React from 'react';
import { useSelector } from 'react-redux';

function MyComponent() {
  const myData = useSelector(state => state.myData);

  return (
    <div>
      <p>{myData}</p>
    </div>
  );
}

```

--------------------------------------------------------------------------------------------


