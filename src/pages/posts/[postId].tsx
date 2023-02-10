import { PostType } from "@/types/types";
import { useRouter } from "next/router";

export default function WithPostId({post}: {post: PostType}) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <h1>Loading ...</h1>
        )
    }
    return (
        <div>
            <h2>{post.id}: {post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}


export async function getStaticPaths() {

    return {
        paths: [
            {
                params: {postId: "1"}
            },
            {
                params: {postId: "2"}
            },
            {
                params: {postId:"3"}
            },
            {
                params: {postId: "4"}
            },
        ],
        fallback: true,
    }
}

export async function getStaticProps({params}:{params: {postId: string}}) {
    const post = await (await fetch("https://jsonplaceholder.typicode.com/posts/" + params.postId)).json();

    return {
        props: {
            post: post
        }
    }
}