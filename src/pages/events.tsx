import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { join } from "path";
import { useState } from "react";

type EventType = {
    id: string,
    title: string,
    description: string,
    category: "sports" | "politics" | "party" | "education",
    data: string
}

// one single event component
const Event = ({event}: {event: EventType}) => {
    return (
        <li>
            <hr />
            <h4>{event.title}</h4>
            <p><span>{event.category}</span>: {event.description}</p>
        </li>
    )
}

// list of all events
export default function EventList({events}: {events: EventType[]}) {
    const [evs, setEvs] = useState(events);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    // client side fetching logic
    const filterBy = async (category: string) => {
        setLoading(true)
        router.push('/events?category=' + category, undefined, {shallow: true}) // push current page as url
        const data = await (await fetch("http://localhost:8000/events?category=" + category)).json();
        setEvs(data)
        setLoading(false)
    }

        // create a list of available categories from initial events
        let tmp: string[] = [];
        events.forEach(e => {
            if (!tmp.includes(e.category)) {
                tmp.push(e.category)
            }
        })
    
    // array of all buttons responsible for filtering specifig categories.
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

// server side fetching and passing initial props to EventList component.
// can handle query params, which will filter events beforehand
export async function getServerSideProps(context: GetServerSidePropsContext) {
    let endpoint = 'http://localhost:8000/events';
    if (context.query.category) {
        endpoint = endpoint +  "?category=" + context.query.category;
    }
    const data: EventType[] = await (await fetch(endpoint)).json();
    
    return {
        props : {
            events: data
        }
    }
}
