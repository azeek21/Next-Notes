# routing
nextjs has file/page based routing. Every file inside pages/ folder becomes a route and pages/index.tsx/jsx/js/ts becomes the root route. 

e.g: pages/home.tsx is a route wich renders default exported component inside home.tsx. When you visit localhost:3000/home/ this home.tsx get's rendered. Interesting :thinking:.

for nested routes you just need to create a folder and files inside it.
## nested routes
To create below :arrow_down: routing in your app
```localhost:3000/blog
localhost:3000/blog/first
localhost:3000/blog/second
```

You just need to create a folder structure that looks like this:
```pages/
    |- blog /
    -------|-index.tsx // this is /blog route
    -------|-first.tsx // this is /blog/first route
    -------|-second.tsx // this is /blog/second route
```
Cool :cool:

## dynamic routes
To create a dynamic route like localhost:3000/product/productsId here productsId is any possible non nested route
eg: localhost:3000/product/1, localhost:3000/product/2, localhost:3000/product/big-red-hat.
Above 1, 2, big-red-hat all considered dynamic part of the route and we can create one route file that can handle all there routes.
### dynamic parts of the route is market with [filename].tsx
so to handle abouve routes we just need below sturcture
````pages/
    | - product /
    ------| - index.tsx
    ------| - [productId].tsx // any non nested route inside localhost:3000/product/ will be mapped to this file.
````
### getting query data from dynamic routes
So in our above example any non nested route after localhost:3000/product/ is query data.
e.g localhost:3000/product/123 -> here 123 is query data;
we want to parse query data for our dynamic route handler [filename].tsx to make sense.
<b> We use useRouter function hook from 'next/router' package to parse query data from route</b>

file: [productsId].tsx look like this :arrow_down:

```
import { useRouter } from "next/router"

export default function ProductDetail() {
    const router = useRouter(); // returns router objets
    console.log(router.query.productId) // must match filename e.g: productId
    return (
        <h1>Product detail: </h1>
    )
}
// logs 1234 to console if users visits localhost:3000/product/1234 
```
so we imported useRouter and called it inside our component inside our [productId].tsx file.
to access the dynamic value passed by route we need to access router.query.filename where filename must be the name of the file that handles our dynamic part of the route. its productId in our example so we write router.query.productId to access let's, they then numeric part (123)of the below route :arrow_down: <br/>
localhost:3000/product/123
#### More on making sense
now we can parese the data from route (url) so we can use that data inside our components to show user the needed info like by fetching the product from server with the id parsed from route.

you can look in ```pages/product/.[productsId].tsx``` file where I simulated fetching data from server and used id wich was passed from dynamic route to fetch that exact product with exact id.

Data will be shown to user if it exists or error message will be shown;

### NOTE: if there's a file that matches the dymaic route nextJs renders that page instead of [].tsx
e.g if user visits localhost:300/products/123 and if you have a file named 123.tsx/js/ts in products directory, that file will be rendered. If 123.tsx doesn't exist, nextJs will render [filename].tsx dynamic query page with 123 as query data accessible from route.query.filename

## nested dynamic routes
what if I want to go to localhost:3000/product/1/review/1 to see the first review feedback for the product. That's a nested dynamic route and of courese we can't create a file for every review inside reviews. :man_shrugging:

so handling is done like this <br/>
if you plan to go deeper than one level with your dynamic routes create a [routeQueryDataName] FOLDER and make a index.tsx file in it you can still access the dynamic query data with useRoute hook from route.query.routeQueryDataName and to nest it you can repeat the above step over and over again as mucha as you want. <br/>

So one way of handlign localhost:3000/product/1/reviews/1 would look like this.
```pages/
--| - product/
  | -----| - index.tsx // lists all products let's just say
  | -----| - [productId]/   //this is a folder 
  | -----| ------| - index.tsx // handle localhost:3000/product/a-product
  | -----| - reviews/ // folder 
  | -----| ------| - index.tsx //lists all reviews about a-products
  | -----| ------| - [reviewId].tsx // handle localhost:3000/product/a-product/reviews/reviewid or you can go even more deeper by creating [reviewId] folder instead of file and go crazy like localhost:3000/product/a-product/reivews/2/comments/3. like I did :smile:
```
it's only up to our preferences and creativity at this point. <br/>
#### Order how nextJs handles routes: 
1. it first looks for regular filenames for route like ```file.js``` and reders if found <br/>
2. else it looks for files that handle dynamic routes like ```[file].js``` and renders if found <br/>
3. else it looks for folders that handle dynamic  routes like ```[folder]/``` and renders ```index.js``` in them <br/>
4. or goes inside that folder and starts again from point ```1``` if route is nested deeeper.
cool :cool: right ?
