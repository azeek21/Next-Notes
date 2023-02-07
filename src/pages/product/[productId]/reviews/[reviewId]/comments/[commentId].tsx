import { useRouter } from "next/router";

export default function GetComment() {
    const router = useRouter();

    return (
        <>
        <h1>A comments who's id is equal to <code>{router.query.commentId}</code> would be here</h1>
        </>
    )
}