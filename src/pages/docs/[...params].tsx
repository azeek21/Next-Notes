import { useRouter } from "next/router"

export default function Doc() {
    const router = useRouter();

    const {params} = router.query;
    console.log(params);
    

    return (
        <>
        <h1>Doc For : </h1>
        <p>
            { typeof(params) == 'object' && 
            params.map((param: string, index: number) => <span key={index}> {param} -&gt;</span>)
            }
            {
                typeof(params) == 'string' && <span>{params}</span>
            }
        </p>
        </>
    )
} 