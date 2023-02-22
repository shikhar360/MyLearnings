import { parseISO, formatDistance } from "date-fns";

import React from 'react'

interface IProps{
  time : string
}

const TimeAgo = ({time} : IProps) => {
  let timeAgo = ""
  if(time){
    const date = parseISO(time)
    const timePeriod = formatDistance(date, new Date())
    timeAgo = `${timePeriod} ago`
  }

  return (
   <span title={time}>
    &nbsp; <i>{timeAgo}</i>
   </span>
  )
}

export default TimeAgo