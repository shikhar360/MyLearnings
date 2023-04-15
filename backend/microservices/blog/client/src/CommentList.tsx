import React,{useState , useEffect} from 'react'
import axios from 'axios'
const CommentList = ({comments}:{comments : {}[]}) => {
  
  // const [comments , setComments] = useState<{}[]>()

  // const fetchData = async() =>{
  //   const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
  //   setComments(res.data)
  // }

  // useEffect(()=>{
  //   fetchData()
  // },[])
  return (
    <div>{
      <ul>

      {comments && comments?.map((comment : any) =>{
       return <li key={comment.id}>{comment.content}</li> 
      })}
      </ul>
      }</div>
  )
}

export default CommentList