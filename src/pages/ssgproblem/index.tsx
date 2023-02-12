
type dataType = {
    id: string,
    name: string
}


export default function Ssg({data}: {data: dataType}) {


    return (
        <>
            <h1>Data from user:</h1>
            <p>Name: {data.name}</p>
        </>
    )
}

export async function getStaticProps() {
    
    // const data = await (await fetch('http://localhost:8000/data')).json()
    const data = {id: 'no', name: 'yes'}
    return {
        props: {
            data: data,
        }
    }
}

