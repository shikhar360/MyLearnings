import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { allPosts } from "../post/postSlice";
import Author from "../post/Author"
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";



const Post = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const post = useSelector(allPosts);

  const reorder = post.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      <h2>Posts</h2>
      {reorder &&
        reorder.map((post) => {
          return (
            <article key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.content.substring(0, 100)}</p>
              <Author userID={post.user} />
              <TimeAgo time={post.date} />
              <ReactionButtons id={post.id} reactions={post.reactions} />
            </article>
          );
        })}
    </section>
  );
};

export default Post;
