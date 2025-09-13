'use client'
import Feed from "@/components/feed/Feed"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { SearchBarContext } from "@/context/searchBar"

const FeedPage = () => {
  const [posts, setPosts] = useState([])
  // const { search } = useContext(SearchBarContext)

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

  async function getSearchPost(search) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/searchdata?q=${encodeURIComponent(search)}`, { withCredentials: true })
        // console.log("search data in feed/page.js", search);
        console.log("searchposts in page", res.data.data)
        setPosts(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <Feed post={posts} onClickSearch={getSearchPost} />
    </div>
  )
}
export default FeedPage