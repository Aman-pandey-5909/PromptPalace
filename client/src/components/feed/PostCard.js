// This displays all of the post info, use for like /post/:id like a specific post which shows all the info, comments etc etc
// for the feed use another card that will be reused in dashboard too 
import React from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { useContext } from "react";
import {SearchBarContext} from "../../context/searchBar"
const PostCard = ({ post }) => {
    const {setSearch} = useContext(SearchBarContext)
    console.log("post", post);
    if(post.length === 0) return <h1>Error loading post, <button onClick={() => window.location.reload()}>Refresh Page</button></h1>
    return (
        <Card className="px-4 py-2 gap-2 my-2 hover:scale-[1.01] transition-all">
            <CardHeader>{post.author.username}</CardHeader>
            <CardTitle className={"line-clamp-1"}>{post.title}</CardTitle>
            <CardDescription className={"line-clamp-3"}>{post.description}</CardDescription>
            <code className="line-clamp-2">{post.prompt}</code>
            <div className="text-blue-700">{
                post.tags.map((tag, index) => <Button onClick={() => setSearch(tag)} className={'p-0 mr-2 text-sm hover:bg-transparent'} variant={"ghost"} key={index}>{tag} </Button>)
            }</div>
        </Card>
    )
}
export default PostCard