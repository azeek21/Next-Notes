import { CommentType } from "@/data/comments";
import { ChangeEvent, useState } from "react";

export default function CommetList() {
    const [data, setData] = useState([] as CommentType[])
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState({
        id: data[-1]?.id + 1,
        text: ''
    })

    
    const fetchComments =async () => {
        setLoading(true)
        const data: CommentType[] = await (await fetch('/api/v1/comments')).json();
        setLoading(false);
        setData(data);
    }

    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setComment(old => ({...old, text: ev.target.value}))
    };

    const submitComment = () => {
        console.log("SUBMIT")
    }

    return (
        <div>
            <h1>List of All comments Here</h1>
            <button onClick={fetchComments} >Click to load comments</button>
            {loading && <h4>Loading...</h4>}
            {data && data.map(d => <h3 key={d.id} > <span>comment:</span> {d.text}</h3>)}
            <form onSubmit={(ev) => {
                ev.preventDefault();
                submitComment();
            }}>
                <label htmlFor="comment">Enter new Comment</label>
                <input id="comment" onChange={handleInput} type="text" value={comment?.text} autoComplete="false" />
                <button>Submit</button>
            </form>
        </div>
    )
}