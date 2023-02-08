import { useRouter } from "next/router"

export default function GetReview() {
    const router = useRouter();

    return (
        <>
        <h1>The review wich's id is equalt to "<code>{router.query.reviewId}</code>" would be here if I had enough time</h1>
        <p>since you are here you sholuld definietely go to <a href={`${router.query.reviewId}/comments/`}>http://localhost:3000/product/productId/reviews/{router.query.reviewId}/comments/</a><br/><br/> 
        or <a href={`${router.query.reviewId}/comments/1`}>http://localhost:3000/product/productId/reviews/{router.query.reviewId}/comments/1</a></p>
        </>
    )
}