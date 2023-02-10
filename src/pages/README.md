# My note while learning NextJs


# routing
Contents: <br/>
<a href="#nested-routes">Nested routess </a> <br/>
<a href="#dynamic-routes">Dynamic routes</a><br/>
----- <a href="#dynamic-parts-of-the-route-is-marked-with-filenametsx">Structure</a><br/>
----- <a href="#getting-query-data-from-routes">Parsing dynamic routes </a><br/>
----- <a href="#note-if-theres-a-file-that-matches-the-dymaic-route-nextjs-renders-that-page-instead-of-tsx"> NOTE </a><br/>
<a href="#nested-dynamic-routes">Nested dynamic routes</a><br/>
----- <a href="#order-how-nextjs-hadnles-routes"> How nextJs handles routes ? </a><br/>
----- <a href="#catching-all-routes">Catching ALL/ANY routes </a><br/>
------------ <a href="#note-paramstsx-will-catch-any-route-so-be-careful-and-make-use-of-it-smile"> NOTE on catching all routes</a><br/>
<br/>
<a href="#navigation-arrow_down"> NAVIGATION </a><br/>
----- <a href="#usage"> Client side navigation with ```<Link href=""> </Link>```  </a><br/>
---------- <a href="#replace-attribute"> replace attribute of Link component </a><br/>
---------------- <a href="#warning-"> WARNING </a><br/>
----- <a href="#programmatically-navigation"> Client side navigation with JavaScript </a>   <br/>
---------- <a href="#--alternative-in-programmatically-navigation"> alternative to Link's replace attribute with JavaScript </a><br/>
<a href="#custom-404-page"> Custom 404 Page </a><br/><br/><br/>
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
### dynamic parts of the route is marked with [filename].tsx
so to handle above routes we just need below sturcture
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
  | -----| ------| - reviews/ // folder 
  | -----| -------------| - index.tsx //lists all reviews about a-products
  | -----| -------------| - [reviewId].tsx // handle localhost:3000/product/a-product/reviews/reviewid or you can go even more deeper by creating [reviewId] folder instead of file and go crazy like localhost:3000/product/a-product/reivews/2/comments/3. like I did :smile:
```
it's only up to our preferences and creativity at this point. <br/>
#### Order how nextJs handles routes: 
1. it first looks for regular filenames for route like ```file.js``` and reders if found <br/>
2. else it looks for files that handle dynamic routes like ```[file].js``` and renders if found <br/>
3. else it looks for folders that handle dynamic  routes like ```[folder]/``` and renders ```index.js``` in them <br/>
4. or goes inside that folder and starts again from point ```1``` if route is nested deeeper.
cool :cool: right ?

### Catching all routes.
Imagagine we need all dynamic route parameters in one file. For example we wan't localhost:3000/docs/ catch all the routes that comes after it no matter of nesting level. <br/>
How do we catch all routes that come after localhost:3000/docs/  ?
Easy :smile:, in nextJs all you need is to create a file that fullfills following pattern  [...params].js. <br/>
So to catch all routes comes after example.com/docs/ you would want to create the following folder structure :arrow_down:

```./pages
---| - docs/
   | --- | - index.tsx // catches example.com/docs/ itself
   | --- | - [...params].tsx // catches all routes after example.com/docs/
```
So now we can use the route example.com/docs as a landing page for all docs and parse any route that comes after it in [...params].tsx. <br/>
see ```src/pages/docs/``` for as an example and start the app with ```yarn dev``` and go to ```localhost:3000/docs/some/nested/routeshere/```
```import {useRouter} from "next/router";

function Doc() {
    const route = useRouter();
    // route.query.filename will hold all nested routes as an array of strings which were caught by [...filename].tsx/jsx/js/ts
    //!!! if nesting is only one level deep, query.params will be a string not an array of strings.
    const allNestedRoutes = route.query.params; // NOTE: params is exactly same as our filename in our case.
    return (
        <>
        <h1> You came here in this order :arraw_down: </h1>
            { typeof(allNestedRoutes) == 'object' && 
            allNestedRoutes.map((param: string, index: number) => <span key={index}> {param} -&gt;</span>)
            }
            {
                typeof(allNestedRoutes) == 'string' && <span>{allNestedRoutes}</span>
            }
        </>
    )
}
```
#### NOTE: [[...params]].tsx will catch ANY route so be careful and make use of it :smile:
 
# END OF ROUTING, READ ABOUT navigation (client side navigation) at navigation branch, you'll need it.

# NAVIGATION :arrow_down:
Server side navigation can be sometimes not so good as it is not as smooth as client side navigation<br/>
To give more reactive and smooth feel to our apps we need to use client side navigation <br/>
Client side navigation is very easy with the help of ```Link component that comes form 'next/link'``` package.
### Link from 'next/link'
With Link we can easyly achieve client side navigation.
#### Usage: 
```<Link href={ 'link/to/somewhere' }> Go to Somewhere </Link>``` This is basic template for Link component. inside href={} you can give absolute or relative routes and it's take you there as smooth as possible.
under the hood it renders an ```<a href=""> </a>``` tag with an event listener on it. And as far as I can imageine this event will prevent browser from making a request and takes us to the neede route using javascript instead. <br/>
#### Navigating to dynamic routes. 
Works same as static navigation we have seen above just you can manipulate the href attribute string as you want <br/>
e.g: 
```
const r1 = 'feature1'
const r2 = 'concept1;
<Link href={`/docs/${r1}/${r2}`}>Got to /docs/${r1}/${r2}</Link>
```
#### TRY:
to see the difference, run the app with ```yarn dev``` and go to <a href="localhost:3000/">localhost:3000/</a> <br/>
from there you can try and see difference between client side routing and server side routing. <br/>
### replace attribute
Function: removes the browsers history stack of navigation in your site and when you go into that link with replace attribute and when you click the back < button you'll end up at home page no matter how deep navigated you were.
usage: <br/>
```<Link href='/docs/f1/c1/c4' replace >Go to docs</Link>``` after user goes into link, user will land at home page when clics on back button no matter of navigation history.
### WARNING !!!
1. Use plain <a></a> tag for navigation out of your app. e.g link to outisde sources like https://example.com; 
2. Always use <Link> </Link> to navigate inside your app. Using <a></a> sends a new request to server wich means you'll LOSE ALL CLIENT SIDE STATES of your app.
### Programmatically Navigation
Sometimes we need to navigate users without visible links users can click, e.g after some events. 
Imagine you are building a payment page and user is given some time and after time runs out or user makes a payment in during that time, user needs to be redirected to payment successfull or not sucessful page respectively.
This is where we need programmatic navigation. <br/>
HOW TO: <br/>
use push() method of object returned by useRouter() hook. <br/>
push() takes a string same as you'd pass to href={} tag of Link component. <br/>
e.g:
```
import <useRouter> from "next/router"


export default function PaymentPage() {
    const router = useRouter()

    useEffect(() => {
        setTimeOut( () => {
            // check if use made payment and route user
            if ('user made payment') {
                router.push('/payment/success/page')
            } else {
                router.push('/payment/fail/page')
            }
        }, 20000)
    }, []);
    return (
        <h1> Please pay $xxx in 2 minutes... </h1>
    )
}
```
Above code is just to show how router.push works don't use it except learning.


#### <Link replace> </Link> alternative in programmatically navigation
just use router.replace('link') instead of router.push('link').
It will have exactly same begaviour as link's replace attribute which means when users clicks back button after you navigate user to 'link' with router.replace, use'r will go staight back to root route no matter of navigation history.

# CUSTOM 404 PAGE
create 404.tsx file ! NAME MUST BE EXACTLY 404 (format can be js/jsx/ts/tsx) ! at the root of your routing folder. which is pages folder in our example.
look at ```src/pages/404.tsx``` for example.

```./pages/
--- | -> index.js   // example.com/ 
    | -> other.js   // example.com/other
    | -> nested/
    | ------| -> index.js   // example.com/nested
    | ------| -> deeper.js  // example.com/nested/deeper
    | -> 404.js     // any incorrect route will be caught in here. | example.com/bad/route/
```


# Pre rendering and data fetching intro
Need to be learned what/why pre-rendering and types of it: <br/>
1. Static Generation
    - without data
    - with data
    - incremental generation
    - dynamic parameters when fetching data
1. Server-side rendering
    - data fetching

- client side data fetching
- combinig pre-rendering with cilent-side data fetching

### What and whys:
Firstly, Why Pre-render a page ?
1. It improves performance .
    - unlike in react where user waits for react to generate and render DOM notes dynamically.
    - with pre rendered page HTML is already generated and loads faster
2. For SEO.
### What is pre-rendering
- Pre-rendering refers to process of generating HTML with needed data for the page in application.

## how to pre-render ?
NextJs has 2 types of pre-rendering
1. static generation
2. server-side rendering

### Static generation concept
HTML pages are generated at build time (when we build the application with ```yarn build``` or ```npm build```) <br/>
HTML with all data for content of the pageis generated in advance during build <br/>
It's recommended type of pre-rendering whenever possible because <br/>
Page can be build once and cached by a CDN and served to client almost instantly whenever requested.
#### Best places to use static generation
- Blog pages
- e-commerce product pages
- documentatin and marketing pages where data isn't highly dynamic and not specific for evey user.
<br/>

#### How statig generation works
So static pages are generated (rendered into whole HTML pages from components) during build and served to user. That's it.
* Static generation is default behaviour of NextJs nothing to be done by user.
#### Static generation with data fetching. getStaticProps
## getStaticProps
As static pages are build once and served many times we can also add data from outer sources. Data that is not subject to changes often is best suitable for Static generation with data fetching. <br/>

To use data fetching you need to export a function called getStaticProps from the js/ts/jsx/tsx file inside pages folder. NextJs automaticly calls that function in the server during build and fetches data and passes it as props to component that's defined in the same file.

* NOTE: getStaticProps must return an object with a props field. The data inside this specific props field will be passed to component as a parameter inside the same file.

* Component: To use components all you need is to create and import component and use them. 
    - NOTE: DON'T declare your component files inside pages folder or anywhere where your routing root starts from, othervise NextJs will treat it like a route and things get messed up. You can create your components folder and files in anywhere other than routing root folder scheme. Name doesn't really matter as long as you understand what you doing.
        - NOTE: NextJs by convention uses kebab-case unlike ReactJs so it's a good practice to follow the convention to make it easier for yourself and everyone to work on the app in the future.

EXAMPLE: Have a look in my src folder, users.tsx in pages folder and user.tsx file in components folder.
```
./src/                  // A folder containing components and pages.
--| -> pages/           // beginning of route (root) (example.com/)
  |    | -> users.tsx   // example.com/users | uses User from components/, exports getStaticProps to fetch data.
  | -> components/      // hols all my components, NextJs will ignore this.
  |    | -> user.tsx    // declaration of User component to be used in users.tsx
```
### Additions to SSG (getStaticProps and Link magic)
When we build the app it builds all the pages as we mentioned earlier, AND <br/>
Here's the big brain moment: If the page user request has any <Link>s to other pages that use getStaticProps inside the app, nextJs prefetches the data in the background and caches it :exploding_head: . And when it detects user's willing to go to that page <Link> is pointing to, nextJs check's for any cheanges before even user clicks on the link and renewes the cached data if it's changed othervise it'll not do anything. This gives user a butter smooth experience.<br/>

* If current page contains a <Link> to another page, when users goes into that page clicking on <Link>, app will not send a request to the server, instead, the page gets rendered on client side with the prefetched JavaScript and Json if it uses any external static data. NOTE: Both JavaScript and Json will be already pre fetched when user is on the previous page that had a <Link /> to it.

<br/>

here's full code:
```./src/pages/users.tsx:```

```
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

```

```./src/components/user.txs```

```

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

```

``` ./src/fetchers/fetch-users.tsx  ```

```

import { UserType } from "@/types/types";

const usersEndpoint = "https://jsonplaceholder.typicode.com/users";

export default async function fetchUsers(): Promise<UserType[]>{
    const users = await (await fetch(usersEndpoint)).json();
    return users;
}

```