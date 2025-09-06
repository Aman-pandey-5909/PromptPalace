'use client'
// import axios from "axios"
// import React, { useState } from "react"
import PostCard from "./PostCard"
import SearchNav from "./search-nav";
// import Link from "next/link"
// const Feed = () => {
//   const [posts, setPosts] = useState([])
//   const onClick = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/feed`, { withCredentials: true })
//       console.log(res.data.data)
//       setPosts(res.data.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <React.Fragment>
//       <div>Feed</div>
//       <div className="flex flex-col gap-3">
//         <button className="border w-fit px-5 py-2" onClick={onClick}>load</button>
//         <Link className="border w-fit px-5 py-2" href="/dashboard">dashboard</Link>
//         {/* <Link className="border w-fit px-5 py-2" href="/dashboard/write">write</Link> */}
//       </div>
//       <div>{posts.map(post => <PostCard key={post._id} post={post} />)}</div>
//     </React.Fragment>
//   )
// }
// export default Feed


const Feed = ({post}) => {
  return (
    <div>
      <SearchNav />
      {post.length === 0 || !post ? <h1>Loading...</h1> : null}
      {post.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  )
}

export default Feed