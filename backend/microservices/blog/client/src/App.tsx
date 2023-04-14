import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
function App() {
  return <div className="container">
    <h1>Post Create</h1>
    <PostCreate/>
    <h2>Posts</h2>
    <PostList/>
  </div>;
}

export default App;
