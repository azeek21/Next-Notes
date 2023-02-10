import { PostType } from "@/types/types";

const postsEndpoint = "https://jsonplaceholder.typicode.com/posts"

export default async function fetchPosts(): Promise<PostType[]> {
    const posts = await (await fetch(postsEndpoint)).json();
    return posts;
}
