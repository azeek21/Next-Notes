import useSWR from 'swr';


const fetcher = async () => {
   return (await fetch("http://localhost:8000/dashboard")).json()
}

export default function Dashboard() {
    // TODO: learn swr deeper
    const {data, error} = useSWR('dashboard',fetcher);


    if (error) return <h1>Error: No idea what happened</h1>
    if (!data) return <h2>Loading ...</h2>

    return (
        <div>
        <h2>User data fetched with client side data fetching</h2>
        

        <h4>Likes: {data.likes}</h4>
                <h4>Followers: {data.followers}</h4>
                <h4>Posts: {data.posts}</h4>
                <h5 style={{color: data.status}}  >Statis: {data.status}</h5>

        </div>
    )
}
