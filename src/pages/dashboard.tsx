import { useEffect, useState } from "react"

export default function Dashboard() {
    const [dashboard, setDashboard] = useState({
        loading: true,
        likes: 0,
        posts: 0,
        followers: 0,
        status: 'silver'
    })


    useEffect(() => {
        (async() => {
            const data = await (await fetch("http://localhost:8000/dashboard")).json()
            console.log(data)
            setDashboard(old => ({...data, loading: false}))
        })()
    }, [])

    return (
        <div>
            <h2>User Dashboard</h2>
            {dashboard.loading ? <p>Loading ...</p> :
                <div>
                <h4>Likes: {dashboard.likes}</h4>
                <h4>Followers: {dashboard.followers}</h4>
                <h4>Posts: {dashboard.posts}</h4>
                <h5 style={{color: dashboard.status}}  >Statis: {dashboard.status}</h5>
                </div>
            }


        </div>
    )

}

export {}