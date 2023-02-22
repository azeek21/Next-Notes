import { GetStaticPropsContext } from "next"

export default ({msg}: {msg: string}) => {

    return (
        <div>
            <h1>Preview mode page</h1>
            <h2>{msg}</h2>
        </div>
    )
}


export async function getStaticProps(context: GetStaticPropsContext) {

    console.log(context.previewData);
    
    const {previewData}: {previewData: {user: string}} = context;

    if ( context.preview ) {
        // this will fetch every time in preview mode if page is build and in prod
        const data = await (await fetch("http://localhost:8000/dashboard")).json()
        return {
            props: {
                msg: previewData.user,
            }
        }
    }

    return {
        props: {
            msg: "Normal page for preview mode ..."
        }
    }
}
