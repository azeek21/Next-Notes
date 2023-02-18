import { NewsType } from "@/types/types"
import { GetServerSidePropsContext } from "next";
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // in case of nested dynamic routes params.category could be list and it messes up everything so be careful lol
    const news  = await (await fetch(`http://localhost:8000/news?category=${context.params?.category}`)).json();

    // TODO: learn deeper about cookies
    context.res.setHeader("Set-Cookie", ['name=Azeek']);
    return {
        props: {
            news: news,
        }
    }
}