import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { UserState } from "../users/usersSlice";

import React from 'react'

interface IProps{
  userID : string
}
const Author = ({userID} : IProps) => {
  
  const users = useSelector(selectAllUsers)

  const author = users.find((user : UserState) => user.name === userID  )

  return (
   <span>by {author ? author.name : "Unknown Author"}</span>
  )
}

export default Author