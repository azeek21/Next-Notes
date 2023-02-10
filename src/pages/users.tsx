// my component from outside of routing root (pages) [mandatory]
import User from "@/components/user"
// my function from outside of routing root (pages) [not suer, but must be mandatory]
import fetchUsers from "@/fetchers/fetch-users"

// User type
import { UserType } from "@/types/types"

// this component will be rendered in /users route. e.g: example.com/users
export default function Users({users}: {users: UserType[]}) {
    return (
        <>
        { users.length && 
            users.map(u => <User key={u.id} user={u} />)
        }
        </>
    )
}

// nextJs will call this function during build in the server and
// save the return data with pre-rendered (generated) HTML to serve to user;
export async function getStaticProps() {
    const users = await fetchUsers();

    return {
        props: {
            users: users
        }
    }
}




