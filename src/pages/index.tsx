import Link from 'next/link'

export default function Home() {
    return (
        <div>
        <h1 style={{
            margin: "auto",
            textAlign: 'center'
        }}>Hello world !</h1>

        <div> <code>Client side</code> navigation:  <Link href={'/blog'}> Go to blog</Link> </div>
        <div> <code>Server side</code> navigation without element from 'next/link':   <a href='/blog'>Go to blog</a> </div>
        <p>See <code>src/pages/index.tsx </code> and <code>src/pages/README.md/#NAVIGATION </code> for usage</p>
        </div>
    )
};