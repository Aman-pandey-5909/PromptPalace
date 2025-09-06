'use client'
import Feed from "@/components/feed/Feed"
import { useState, useEffect } from "react"
import axios from "axios"

const FeedPage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/feed`, { withCredentials: true })
        console.log("res in page", res.data.data)
        setPosts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost();
  }, [])

  return (
    <div>
      <Feed post={posts} />
    </div>
  )
}
export default FeedPage