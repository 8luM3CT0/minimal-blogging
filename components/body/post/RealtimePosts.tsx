import React from "react";

type Post = {
    id: string,
    created_at: string,
    title: string,
    post: string
}

export default function RealtimePost({
    serverPosts
}: {
    serverPosts: Post[]
}){
    return (<pre>{JSON.stringify(serverPosts, null, 2)}</pre>);
}