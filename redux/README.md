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

```js
import { useDispatch } from 'react-redux';
import { incrementCounter } from './actions';

function MyComponent() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(incrementCounter());
  };

  return (
    <button onClick={handleClick}>Increment Counter</button>
  );
}
```
In this example, we first import useDispatch from the react-redux library, and an action creator function incrementCounter from a file named actions.js. We then call the useDispatch hook to obtain the dispatch function.

Inside the handleClick function, we use the dispatch function to dispatch the incrementCounter action to the Redux store. When the button is clicked, it triggers the handleClick function, which in turn dispatches the action to the store.

By using useDispatch, we can easily dispatch actions from within our React components, without having to manually pass the dispatch function down through multiple layers of props. This makes it easier to manage our application state and keep our code organized.




```js

import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { fetchData } from './actions';

function MyComponent() {
  const store = useStore();

  useEffect(() => {
    store.dispatch(fetchData());
  }, []);

  return (
    <div>
      // Render some UI here
    </div>
  );
}
```
In this example, we first import useStore from the react-redux library, and an action creator function fetchData from a file named actions.js. We then call the useStore hook to obtain a reference to the Redux store instance.

Inside the useEffect hook, we use the store.dispatch method to dispatch the fetchData action to the Redux store. This action triggers an API call to fetch data from a remote server.

By using useStore, we can directly access the Redux store from our component and dispatch actions to it. This can be useful in situations where we need more control over the dispatching of actions or when we need to directly access the store's state or methods. However, it is generally recommended to use the more specialized useSelector and useDispatch hooks for most use cases.


#### createAsyncThunk

Async thunks are typically used to make network requests, fetch data from APIs, or perform other types of asynchronous operations that may take some time to complete.

```js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
    return response.data
  }
)
```

In this example, we use the createAsyncThunk function from the @reduxjs/toolkit package to create an async thunk called fetchUserById. The first argument to createAsyncThunk is a string that serves as a prefix for the action types that will be dispatched when this thunk is invoked. The second argument is an async function that contains the logic for the async operation.

The async function takes two arguments: the first argument is the payload that was passed to the thunk when it was dispatched (in this case, the userId), and the second argument is an object that contains several properties, including dispatch and getState, which can be used to interact with the Redux store.

In this example, we use the axios library to make an HTTP GET request to the JSONPlaceholder API to fetch a user by their ID. Once the request is complete, we return the response data as the result of the async thunk. This data can then be accessed by the Redux store and used to update the state of the application.

When the fetchUserById async thunk is dispatched, it will trigger a series of actions with the following action types:

users/fetchByIdStatus/pending: This action is dispatched when the async operation is started.
users/fetchByIdStatus/fulfilled: This action is dispatched when the async operation is successfully completed, and the result is returned.
users/fetchByIdStatus/rejected: This action is dispatched if the async operation fails or throws an error.
By using async thunks in Redux, we can simplify the process of handling asynchronous operations in our applications, and ensure that the state of the application remains consistent and predictable throughout the lifecycle of these operations.

In simple terms 

An async thunk is a function that returns another function, which in turn can be used to dispatch asynchronous actions in a Redux application. The purpose of the async thunk is to allow for more complex and asynchronous logic to be executed before an action is dispatched.

The inner function returned by an async thunk takes two arguments: the dispatch function and the getState function. The dispatch function is used to dispatch actions, and the getState function is used to retrieve the current state of the Redux store.

The async thunk itself is usually an asynchronous function that performs some kind of logic or network request before dispatching an action. This allows for more complex behavior than a simple action creator that immediately dispatches an action.


--------------------------------------------------------------------------------------------


