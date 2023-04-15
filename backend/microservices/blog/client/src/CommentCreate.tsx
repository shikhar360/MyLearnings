import React,{useState} from 'react'
import axios from 'axios'

const CommentCreate = ({postId}: {postId : number}) => {
  const [content, setContent]= useState<string>('')

  const onSubmit = async(e : React.FormEvent)=>{
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments` , {
      content
    })
    setContent('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">New Comment</label>
          <input type="text" value={content} onChange={e => setContent(e.target.value)} className='form-control' />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate