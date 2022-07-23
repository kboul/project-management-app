# Project Management App

## .env

Create a .env file and include:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_db_uri
```

node server opens with

```
yarn dev
```

graphql server opens on

```
http://localhost:5000/graphql
```

get only name, email, id for a single client:

```
{
  client(id: "1") {
    name,email,id
  }
}
```

get only name, email, id, phone for all clients:

```
{
  clients {
    name,email,id,phone
  }
}
```

get specific id from a project and show relevent client info:

```
{
  project(id: "1") {
    name,status,description,client {
      name,id
    }
  }
}
```
