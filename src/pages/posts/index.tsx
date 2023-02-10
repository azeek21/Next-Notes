import Post from "@/components/post"
import fetchPosts from "@/fetchers/fetch-posts"
import { PostType } from "@/types/types"

export default function Posts({posts}: {posts: PostType[]}) {

    return (
        <div>
            <h1>All Posts Here: </h1>
            {
                posts.length &&
                posts.map(post => <Post key={post.id} post={post} id={post.id} />)
            }
        </div>
    )
}


export async function getStaticProps() {
    const posts = await fetchPosts()

    return {
        props: {
            posts: posts
        }
    }
}


