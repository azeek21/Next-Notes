import { CommentType } from "@/data/comments";
import { ChangeEvent, useState } from "react";

function Comment({comment, clickHandler, fetchComments}: {comment: CommentType, clickHandler: (commentId: number) => void, fetchComments: () => void}) {
    const [editing, setEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);
    // const [comment]

    const updateComment = async(commentId: number, text: string) => {
        const data = await (await fetch("/api/v1/comments/" + commentId, {
            method: "PATCH",
            body: JSON.stringify({
                text: commentText
            })
        })).json();
        fetchComments();
    }

    return (
        <div>
            <h3>{comment.id}: {comment.text}</h3>
            {editing &&
                <input onChange={(ev) => {setCommentText(ev.target.value)}} type="text"  value={commentText}  />
            }

            <button onClick={() => {clickHandler(comment.id)}}>Delete</button>
            
            <button onClick={() => {
                if (!editing) {
                    setEditing(true)
                } else {
                    updateComment(comment.id, commentText);
                    setEditing(false);
                }
            }}>
                {!editing ? "EDIT" : "SAVE"}
            </button>
            
            <hr />
        </div>
    )
}


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
        setComment({text: ""})
        setData(old => ([...old, data]));
        setLoading(false);
    }


    const delComment = async (commentId: number) => {
        const resp = await fetch("/api/v1/comments/" + commentId, {
            method: "DELETE",
        })
        const data = await resp.json();
        console.log(data);
        fetchComments();
    }

    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setComment(old => ({...old, text: ev.target.value}))
    };



    return (
        <div>
            <h1>List of All comments Here</h1>
            <button onClick={fetchComments} >Click to load comments</button>
            {loading && <h4>Loading...</h4>}
            {data && data.map(d => <Comment key={d.id} comment={d} clickHandler={delComment} fetchComments={fetchComments} />)}
            <form onSubmit={(ev) => {
                ev.preventDefault();
                submitComment();
            }}>
                <label htmlFor="comment">Enter new Comment<br/></label>
                <input id="comment" onChange={handleInput} type="text" value={comment?.text} autoComplete="false" />
                <button type={comment.text ? "submit" : "button"} disabled={comment.text ? false : true}>{loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    )
}