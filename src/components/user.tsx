import { UserType } from "@/types/types";

// just a regular user component wich get's a user as prop and return JSX filling the info of user.
export default function User({user}: {user: UserType}) {
    
    return (
        <>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        </>
    )
}