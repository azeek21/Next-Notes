# routing
nextjs has file/page based routing. Every file inside pages/ folder becomes a route and pages/index.tsx/jsx/js/ts becomes the root route. 

e.g: pages/home.tsx is a route wich renders default exported component inside home.tsx. When you visit localhost:3000/home/ this home.tsx get's rendered. Interesting :thinking:.

for nested routes you just need to create a folder and files inside it.
## To create below routing in your app 
```localhost:3000/pages
localhost:3000/pages/first
localhost:3000/pages/second
```
You just need to create a folder structure that looks like this
```pages/
    |- pages /
    -------|-index.tsx // this is /pages route
    -------|-first.tsx // this is /pages/first route
    -------|-second.tsx // this is /pages/second route
```
:cool:.