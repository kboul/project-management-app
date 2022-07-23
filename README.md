# Project Management App

node server opens with

```
yarn dev
```

graphql server opens on

```
http://localhost:5000/graphql
```

try getting only name, email, id:

```
{
  client(id: "1") {
    name,email,id
  }
}
```
