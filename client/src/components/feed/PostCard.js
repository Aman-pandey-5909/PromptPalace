// This displays all of the post info, use for like /post/:id like a specific post which shows all the info, comments etc etc
// for the feed use another card that will be reused in dashboard too 
import React from "react"
const PostCard = ({ post }) => {
    console.log(post.tags);
    return (
        <div className="border-black border px-4 py-2 my-2">
            <div>{post.author.username}</div>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <code>{post.prompt}</code>
            <div>{
                post.tags.map((tag, index) => <span key={index}>{tag} </span>)
                }</div>
        </div>
    )
}
export default PostCard