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

## SSG with dynamic parameters
* Why we need ? <br/>
    -- Imagine we have a dynamic route to a page and that page in turn needs to fetch some data depending on that dynamic route's paremeter For example: example.com/posts/postId . Here postId can range all the way up to infinity or even strings or anything, afterall, it's a dynamic parameter,  but we serve with [postdId].tsx file inside pages/posts/ folder as we learned in <a href="#dyanmic-routes"> dyanmic routes </a> section. And we need them to be Staticly Generated, so that our website will be smoother, and easire for search engine indexers.

* How we do it ? <br/>
## getStaticPaths is the answer
* From our dynamic route file ```[postId].tsx```, in our example, we need to export an async function named exactly getStaticPaths. <br/>
* getStaticPaths must return an object with 2 mandatory keys. 
    * ```paths``` -> an array of objects wich include another mandatory key named ```params``` which in turn must be an object and has to have an key named exactly same as the name of the file ,but without bracets and format, getStaticPaths function is being exported from.
    * ```fallback``` -> mode how NextJs treats routes we didn't include in ```paths```. I'll tell about it later. <br/>
    For our example: example.com/posts/3 or example.com/posts/4 or anything other than 1 and 2 will be handled by the mode we specify in ```fallback```
EXAMPLE: ```pages/posts/[postId].tsx```
```

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: { postId: '1' },
            },
            {
                params: { postId: '2' },
            },
        ],
        fallback: false,
    }
}

```
So nextJs accepts this object and if you look close you can see paths is an array of objects that means NextJs will simulate a route with the specified params in these objects and generate Static HTML pages during build.  <br/>
Here's how it might go for our above example: NextJs accepts our array of objetcs in paths returned by getStaticPaths. NextJs then turn by turn generate HTML pages for each object of this array passing parameter's to the generator that we specified in our params: object which is postId in our example. <br/>
NextJs will generate 2 files for above example during build. which will be served at example.com/posts/1 and example.com/posts/2 respectively. AND WE LET THE NEXTJS KNOW TO DO THIS BY RETURNING THAT OBJECT WICH HAD THESE PARAMS SPECIFIED BY US FROM getStaticPaths. 😮‍💨 I hope now I made it clear. :smile: <br />
BUT WAIT, that's not it, we still need to fetch data from remote for our dynamic routes, PLEASE read the below section.

## passing args to getStaticProps
remember <a href="#getStaticProps"> getStaticProps </a> from older talks ? There's more to it, <br/>
getStaticProps function acceps a parameter wich is routes object returned by useRoutes() by default. <br/>
Which means we can parse passed parameters from getStaticPaths return value when NextJs tries to generate HTML pages during build. <br/>

EXAMPLE: ```pages/posts/[postId].tsx```
```
// look at src/types/typex.ts for type definitions;

import { PostType } from "src/types/types";

export default function Post({post}: {post: PostType}) {
    return (
        <div>
            <h1> {post.title} </h1>
            <p> {post.body} </p>
        </div>
    )
}

export async function getStaticPaths() {

    return {
        paths: [
            {
                params: {postId: "1"}
            },
            {
                params: {postId: "2"}
            },
        ],
        fallback: true,
    }
}

// route ->  object wich we used to get from useRoutes()
export async function getStaticProps(route) { 
    const post = await (await fetch("https://jsonplaceholder.typicode.com/posts/" + route.params.postId)).json();

    return {
        props: {
            post: post
        }
    }
}
```
Now we can calmly proceed to generating HTML static pages for our dynamic routes. <br/>
### SSG with getStaticPaths & getStaticProps flow
Here is flow of generation during build -> nextJs will parse paths returned by getStaticPaths and call getStaticProps for each object in paths passing params of that object to getStaticProps, and when getStaticProps return an object which in turn must have an props object, NextJs will call our default exported component passing that props object as parameter and reders returned JSX as static HTML page. <br/>
and above procedure will be repeated for every single object inside paths returned by getStaticPaths.
<br/>
🥵🥵 :smile: THAT'S IT, if you master and deeply understand above concepts, you are done for the most part of the SSG.

## fallback key returned by getStaticPaths
As i mentioned earlier, getStaticPaths return an object with 2 mandatory keys, ```paths```, and ```fallback```, we talked about ```paths``` above. <br/>
* What is ```fallback```:
    - It is a key tells NextJs what to do when a pre-rendered (SSG generated) HTML file is not found for a dynamic route. <br/> For our the example in <a href="#passing-args-to-getstaticprops"> THIS </a> section, mode specified by ```falback``` will be used. 
    - ```fallback``` key can be one of these 3 values (modes): ```true | false | "blocking"```. we will talk about each of them below.

### falback: false
* HTML pages will be generated for every path returned by getStaticPaths function in paths array with calling getStaticProps DURING BUILD TIME.
* Any OTHER PATH (route) will result (be treated) in (as) 404 (NOT FOUND).
So If user goes to any other route other than returned by getStaticPaths, user will eventually end up in 404.
All HTML is pre-rendered and generated during build and will not change when application is up and running.

### falback: true

* HTML pages will be generated for every path as it was set to false.

* Unlike the first mode, the path that are not generated at build time will not result in 404. Instead, NextJs serves a fallback version of the page and and generates static page for the path and fetches data using getStaticProps. As soon as NextJs finishes fetching data for the current page that it served fallback version earlier, it sends the fetched json to the client browser and component will receive needed props from the json and will be rendered in the client's side with props. At the same time NextJs saves generated HTML and JSON to pre-renderd pages as if it was generated at build time and will be served as it was generated during build from server just like other pages.

* * HOW TO DELIVER FALBACK VERSION OF THE PAGE ?
* * - Inside your default exported component you can initialize routes object with useRoutes hook. routes object provides routes.isFalback atribute wich is a boolean which tells the developer wich state of page needs to be returned. So depending on routes.isFalback we can return a loading statement if routes.isFalback is true or the original page itself if routes.isFalback is false. <br/>
Example: ```./src/pages/posts/[postId].tsx ```
```

import { PostType } from "@/types/types";
import { useRouter } from "next/router";

export default function WithPostId({post}: {post: PostType}) {
    const router = useRouter();
    
    // check if we are in falback mode
    if (router.isFallback) { 
        // and return a loading page 
        // loading page can be anything we want 
        // but lighter and user friendly loaders are better to use.
        return (

            <h1>Loading ...</h1>
        )
    }

    // returning original page if we are not in fallback mode
    return (
        <div>
            <h2>{post.id}: {post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

```


### falback: blocking

* Same as ```fallback: true``` except falback page will not be served. Browser will keep loading untill page is generated in the server and will receive already pre-rendered ready HTML page.

### getStaticPaths & getStaticParams & Link magic :smile:
If you remember from <a href="#additions-to-ssg-getstaticprops-and-link-magic"> here </a> NextJs used to load other pages too in the background if they are mentioned in current page with Link component. This technuque alsgo generates pages in the background too.
* If current page has any Links to other pages, all data needed for Link will be loaded in the background and If pages needed for Link doesn't exist, nextJs will generate them if Links to these pages are inside the viewport and save them. So when user clicks on a Link there's very high chance that page already exists or is in the process of generation which delivers a lot better performance and smoothness to the user side.

<b> All my examples for SSG, getStaticPaths, getStaticProps and other needed files can be found in ```  ./src/pages/posts/ ``` </b>

# Problems with Static Site Generation (SSG)
* Stale data.
    -   One website is built with SSG the data becomes independent of the source as NextJs gets the data and saves it as json and generates needed static HTML pages. Wich means even if the data on the server where we fetched with getStaticProps change, our pages will still contain old (stale data). Something nobody wants.
* Long build time.
    -   The more pages we have, the longer build takes to finish. Add the fact that you have to rebuild the whole app even to make a small change. Not suitable for latest real world big applications, afterall, when we started learning NextJs, all we were after was better performant dynamic apps.

You can recreate the error in this order. <br/>
I made a mock backend in ```./public/backend/index.ts``` file. Whick returns just a name and id in an object. <br/>
Then I compiled the index.ts file with typescript and started the server. It returns a JSON object which contains id and name. Now go ahead and start the server with ```node .``` in ```./public/backend```. <br/>
Now go int ```./src/pages/ssgproblem/index.tsx``` and ucomment 21st line and comment 22 line. <br/>
Now build the nextJs app with ```yarn build``` | NOTE: backend must be running at this point. <br/>
When build finshed do a ```yarn start``` and go to <a href="http://localhost:8000/data"> locahlost:3000/data </a> </br>
PROBLEM itself: you can see name is "a" in this page. <br>
Now go back to server file in ```./public/backend/index.ts``` change 11st line to anything you want and recompile it with ```tsc index.ts``` and run it again with ```node .```. Now go back to nextJs page which was at localhost:3000/data and refresh the page. <br/>
SEE ?  name didn't change. Now rebuild the nextJs app and start it again and then go to localhost:3000/data now it changed to whatever we wrote in 11st line of backend. 

What happened: We made a mock backend and built our NextJs with fetching data from it. And we changed the data on our backend and watched how nextjs ssg generated page changes. And we saw that nothing didn't change on the front end, wich explains stale data problem of nextJs SSG very well. 
