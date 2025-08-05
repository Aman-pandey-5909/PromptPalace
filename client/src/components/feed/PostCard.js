import React from "react"
const PostCard = ({ post }) => {
    const tags = post.tags.map(tag => `#${tag} `)
    return (
        <div className="border-black border px-4 py-2 my-2">
            <div>{post.title}</div>
            <code>{post.prompt}</code>
            <div>{tags}</div>
        </div>
    )
}
export default PostCard