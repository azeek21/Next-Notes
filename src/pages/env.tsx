export default ({env}: {env: {DB_NAME: string, DB_GITHUB: string}}) => {
    return (
        <>
        <h3>Below are read from .env files in the server inside getServerSideProps()</h3>
            <p>{env.DB_NAME}</p>
            <a href={env.DB_GITHUB}>My github page here ...</a>
            <p>Below line is read from .env NEXT_PUBLIC_</p> <br />
            <p>{process.env.NEXT_PUBLIC_MISS_YOU}</p>
        </>
    )
}

export async function getServerSideProps() {

    const env = {...process.env};
    return {
        props: {
            env: env
        }
    }
}
