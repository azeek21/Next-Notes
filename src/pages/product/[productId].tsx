import { useRouter } from "next/router"
import { resolve } from "path";
import { useEffect, useState } from "react";
import {prods} from './index'

type ret_type = {
    data: typeof prods[0] | null,
    error: string | null,
};

// resolves after 3 seconds
async function GetProduct(id: string | string[] | undefined): Promise<ret_type> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            prods.forEach(prod => {
                if (prod.id && prod.id === id) {
                    resolve({data: prod, error: null});
                    return ;
                }
            })
            reject({data: null, error: new Error("Product width id " + id + ' not found')})
            return
        }, 3000);
    })     
}


export default function ProductDetail() {
    const [data, setData]: any = useState(null);
    const router = useRouter();

    const ID = router.query.productId;

    useEffect(() => {
        GetProduct(ID)
                        .then(data => setData(data))
                        .catch(data => setData(data))
    }, [ID])


    return (
        <>
        <h1>Product detail: </h1>
        {data?.data && <p>ID: {data?.data.id} - {data?.data.title}</p>}
        {data?.error && <p>ERROR occoured:  {data?.error.message}</p>}
        {!data ? 'loading...' : ''}
        </>
    )
}


