import React from "react";
import Author from "../post/Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = ({ post }: any) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body.substring(0, 100)}</p>
      <Author userID={post.user} />
      <TimeAgo time={post.date} />
      <ReactionButtons id={post.id} reactions={post.reactions} />
    </article>
  );
};

export default PostExcerpt;
