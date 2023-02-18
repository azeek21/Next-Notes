import { NewsType } from "@/types/types";


function News({news}: {news: NewsType}) {

    return (
        <div>
            <h3>{news.id}: {news.title}</h3>
            <p>{news.description}</p>
            <hr/>
        </div>
    )
}


export default function NewsList({news}: {news: NewsType[]}) {

    return (
        <>
        <h1>List of News Articles:</h1>
        {
            news.length &&
            news.map((n) => <News news={n}/>)
        }
        </>
    )
}


export async function getServerSideProps() {
    const news  = await (await fetch("http://localhost:8000/news")).json();
    return {
        props: {
            news: news,
        }
    }

}

