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

Get only name, email, id for a single client:

```
{
  client(id: "1") {
    name,email,id
  }
}
```

Get only name, email, id, phone for all clients:

```
{
  clients {
    name,email,id,phone
  }
}
```

Get specific id from a project and show relevent client info:

```
{
  project(id: "1") {
    name,status,description,client {
      name,id
    }
  }
}
```

Add a client with specific info:

```
mutation {
  addClient(name: "Tony Stark", email: "tonyStark@gmail.com", phone: "555-555-555") {
    id
    name
    email
    phone
  }
}
```

Delete a client by showing specific info:

```
mutation {
  deleteClient(id: "a_valid_id") {
    name
  }
}
```
