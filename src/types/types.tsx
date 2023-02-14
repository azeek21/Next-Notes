export type UserAddressType = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string
    }
}

export type UserCompanyType = {
    name: string;
    catchPhrase: string;
    bs: string;
}

export type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddressType;
    phone: string;
    website: string;
    company: string;
}

export type PostType = {
    userId: number,
    id: number,
    title: string,
    body: string,
}


export type NewsType = {
    id: number,
    title: string,
    description: string,
    category: string,
}