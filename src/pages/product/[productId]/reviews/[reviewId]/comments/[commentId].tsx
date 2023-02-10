import { useRouter } from "next/router";

export default function GetComment() {
    const router = useRouter();

    return (
        <>
        <h1>A comment of products that its id is equal to <code>{router.query.commentId}</code> would be here</h1>
        </>
    )
}