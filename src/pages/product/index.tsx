
const prods = [
    {
        id: '1',
        title: 'Products number one'
    },
    {
        id: '2',
        title: 'Products number second'
    },
    {
        id: '3',
        title: 'Products number three'
    },
]

export default function Products() {


    return (
        <>
        <h1>Products Page</h1>
        {
            prods.map((prod, index) => (<p key={prod.id} >Product:{prod.id} - {prod.title}</p>))
        }
        </>
    )
}


export {prods};