import { useState } from "react";
import useSWR from 'swr';

type EventType = {
    id: string,
    title: string,
    description: string,
    category: "sports" | "politics" | "party" | "education",
    data: string
}

const Event = ({event}: {event: EventType}) => {


    return (
        <li>
            <hr />
            <h4>{event.title}</h4>
            <p><span>{event.category}</span>: {event.description}</p>
        </li>
    )
}

export default function EventList({events}: {events: EventType[]}) {
    const [evs, setEvs] = useState(events);
    const [loading, setLoading] = useState(false)
    let tmp: string[] = [];

    events.forEach(e => {
        if (!tmp.includes(e.category)) {
            tmp.push(e.category)
        }
    })

    const filterBy = async (category: string) => {
        setLoading(true)
        const {error, data} = useSWR('events', async () => {
            return await (await fetch("http://localhost:8000/events?category=" + category)).json();
        })
        // const data = await (await fetch("http://localhost:8000/events?category=" + category)).json();
        setEvs(data)
        setLoading(false)
    }

    const Buttons = tmp.map((c, i) => <button key={i} type="button" onClick={() => {filterBy(c)}} > {c} </button>)

    return (
        <ul>
            <button type="button" onClick={() => {filterBy('ALL')}} >All</button>
            {Buttons}
            <h2>List of events: </h2>
            <div>
            {loading && <h4>Loading ...</h4>}
            </div>
            {(evs && !loading) &&
                evs.map(e => <Event key={e.id} event={e} />)
            }
        </ul>
    )
}

export async function getServerSideProps() {
    const data: EventType[] = await (await fetch('http://localhost:8000/events')).json();
    
    return {
        props : {
            events: data
        }
    }
}


export {}