import { CommentType } from "@/data/comments";
import { useState } from "react";

export default function CommetList() {
    const [data, setData] = useState([] as CommentType[])
    const [loading, setLoading] = useState(false);

    const fetchComments =async () => {
        setLoading(true)
        const data: CommentType[] = await (await fetch('/api/v1/comments')).json();
        setLoading(false);
        setData(data);
    }

    return (
        <div>
            <h1>List of All comments Here</h1>
            <button onClick={fetchComments} >Click to load comments</button>
            {loading && <h4>Loading...</h4>}
            {data && data.map(d => <h3 key={d.id} > <span>comment:</span> {d.text}</h3>)}
        </div>
    )
}