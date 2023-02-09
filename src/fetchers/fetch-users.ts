import { UserType } from "@/types/types";

const usersEndpoint = "https://jsonplaceholder.typicode.com/users";

export default async function fetchUsers(): Promise<UserType[]>{
    const users = await (await fetch(usersEndpoint)).json();
    return users;
}
