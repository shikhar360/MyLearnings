import React , {useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { allPosts , getPostsError , getPostsStatus , fetchPosts } from "../post/postSlice";
import PostExcerpt from "./PostExcerpt";
import { AppDispatch } from "../../store/store";



const Post = () => {
 
  const post = useSelector(allPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const dispatch = useDispatch<AppDispatch>();

  const reorder = post.slice().sort((a, b) => b.date.localeCompare(a.date));
 
  useEffect(()=>{
   if(postsStatus === "idle"){
     dispatch(fetchPosts())
   }

  },[postsStatus, dispatch])
  return (
    <section>
      <h2>Posts</h2>
      {reorder && postsStatus === "succeeded" &&
        reorder.map((post) => {
          return (
            <PostExcerpt key={post.id} post={post}/>
          );
        })}
      {postsStatus === "loading" && <div>Loading...</div>}
      {postsStatus === "failed" && <div>{postsError}</div>}
    </section>
  );
};

export default Post;
