import { useState } from "react";


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
    let tmp: string[] = [];

    events.forEach(e => {
        if (!tmp.includes(e.category)) {
            tmp.push(e.category)
        }
    })

    const filterBy = (category:  string) => {
        if (category === "ALL") {
            setEvs(events);
        }
        else {
            setEvs(events.filter(e => e.category === category))
        }
    }

    const Buttons = tmp.map((c, i) => <button key={i} type="button" onClick={() => {filterBy(c)}} > {c} </button>)

    return (
        <ul>
            <button type="button" onClick={() => {filterBy('ALL')}} >All</button>
            {Buttons}
            <h2>List of events: </h2>
            <div>

            </div>
            {evs &&
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