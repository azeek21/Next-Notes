import { COMMENTS, CommentType } from "@/data/comments";
import { useRouter } from "next/router";

export default function Comment({comment}: {comment: CommentType}) {
    const router = useRouter();

    if (router.isFallback) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            <h3>{comment.id}: {comment.text}</h3>
        </div>
    )
}




export async function getStaticPaths() {

    let paths = [];

    for (let i = 0; i < 5; i++){
        paths.push({params: {id: i + ""}});
    }
    return {
        paths: paths,
        fallback: true,
    }
}

export async function getStaticProps({params}:{params: {id: string}}) {
    
    return {
        props: {
            comment: COMMENTS.find(c => c.id === +params.id) || {id: 404, text: "NOT FOUND !"}
        }
    }
}