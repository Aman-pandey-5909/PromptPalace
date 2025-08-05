'use client'
import axios from "axios"
import React, { useState } from "react"
import PostCard from "./PostCard"
const Feed = () => {
  const [posts, setPosts] = useState([])
  const onClick = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/posts`, { withCredentials: true })
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      <div>Feed</div>
      <button onClick={onClick}>load</button>
      <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
    </React.Fragment>
  )
}
export default Feed