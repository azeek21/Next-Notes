import { CommentType } from "@/data/comments";
import { ChangeEvent, useState } from "react";

export default function CommetList() {
    const [data, setData] = useState([] as CommentType[])
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState({
        text: ''
    })

    
    const fetchComments =async () => {
        setLoading(true)
        const data: CommentType[] = await (await fetch('/api/v1/comments')).json();
        setLoading(false);
        setData(data);
    }

    const submitComment = async () => {
        setLoading(true);
        const resp = await fetch("/api/v1/comments", {
            method: "POST",
            body: JSON.stringify({comment: comment}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json();
        setData(old => ([...old, data]));
        setLoading(false);
    }

    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setComment(old => ({...old, text: ev.target.value}))
    };



    return (
        <div>
            <h1>List of All comments Here</h1>
            <button onClick={fetchComments} >Click to load comments</button>
            {loading && <h4>Loading...</h4>}
            {data && data.map(d => <h3 key={d.id}> <span>{d.id}:</span> {d.text}</h3>)}
            <form onSubmit={(ev) => {
                ev.preventDefault();
                submitComment();
            }}>
                <label htmlFor="comment">Enter new Comment<br/></label>
                <input id="comment" onChange={handleInput} type="text" value={comment?.text} autoComplete="false" />
                <button type="submit">{loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}