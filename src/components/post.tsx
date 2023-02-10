import { PostType } from "@/types/types";
import Link from "next/link";


export default function Post({post, id}: {post: PostType, id: number}) {

    return (
        <div style={{
            padding: '1rem',
            border: '0.1rem solid rgba(255, 255, 255, 0.5)',
            borderRadius: '0.5rem',
            margin: '0.5rem 2rem'
        }} >
            <h4>{id}: {post.title}</h4>
            <Link href={'posts/' + post.id} > Read more ... </Link>
        </div>
    )
}
