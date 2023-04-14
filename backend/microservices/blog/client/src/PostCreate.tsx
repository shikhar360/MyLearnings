import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [val, setVal] = useState<string>("");
  console.log(val);
  
  const onSubmit = async(e : any)=>{
   e.preventDefault()

   await axios.post("http://localhost:4000/posts" , {
    title : val
   })

   setVal("")
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input onChange={handleChange} type="text" className="form-control" value={val} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
