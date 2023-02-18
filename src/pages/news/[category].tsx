import { NewsType } from "@/types/types"
import {News} from './index'

export default function ByCategory({news}: {news: NewsType[]}) {

    return (
        <>
        { news &&
            news.map(n => <News key={n.id  } news={n} />)
        }
        </>        
    )
}

export async function getServerSideProps({params}: {params: {category: string}}) {
    // in case of nested dynamic routes params.category could be list and it messes up everything so be careful lol
    const news  = await (await fetch(`http://localhost:8000/news?category=${params.category}`)).json();
    return {
        props: {
            news: news,
        }
    }
}