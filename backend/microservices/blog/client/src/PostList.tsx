import React, { useState, useEffect , useMemo } from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from "./CommentList";
const PostList = () => {
  const [post, setPost] = useState<any>();

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPost(res.data);
  };

  useMemo(() => {
    fetchPost();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {post &&
        Object.values(post).map((post: any) => {
          return (
            <div
              className="card"
              style={{ width: "30%", marginBottom: "20px" }}
              key={post.id}
            >
              <div className="card-body">
                <h3>{post.title}</h3>
                <CommentCreate postId={post.id as number}/>
                <CommentList postId={post.id}/>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
