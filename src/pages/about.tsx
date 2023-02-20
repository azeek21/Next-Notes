import Head from "next/head"

export default function About() {
    return (
        <>
        <Head>
            <title>About my app</title>
            <meta name="description" content="This page is great for SEO and has dynamic title and head" />
        </Head>
        <h1>About Page here !</h1>
        <p>The dynamic title and meta description makes this page special</p>
        <p>Don't believe me ? - Go to another page and come back and check for changes in the title.</p>
        </>
    )
}