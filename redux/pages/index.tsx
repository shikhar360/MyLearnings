
// import Counter from '../components/counter/Counter';
import Post from '../components/post/Post';
import AddPostForm from '../components/post/AddPostForm';

export default function Home() {
  return (
    <div style={{
      display : "flex",
      flexDirection : "column",
      alignItems : "center",
      justifyContent : "center",
    }}>

     {/* <Counter/> */}
     <AddPostForm/>
     <Post/>
    </div>
  )
}
