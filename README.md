# Spotlist API

Spotlist is a Javascript challenge part of [Rviewer Codeathon](https://go.rviewer.io/codeathon/)

 - [The challenge](#the-challenge)
   - [Requirements](#requirements)
   - [What are we looking for?](#what-are-we-looking-for)
 - [External dependencies](#external-dependencies)
 - [Installation & Init.](#installation)
 - [Runing tests](#runing-tests)
 - [Usage](#usage)
---
## The Challenge

Spotlist is a new indie music company that aims to provide better relationships with small artists.

Their product is _Spotlist_, a platform in which people can generate and share playlists for their favourite artists providing them with visibility.

**Current Status**

The CEO of _Spotlist_ hired you to develop the initial version of his product. Its worth mentioning that she does not have any technical background.

However, she has a clear vision on how the product should behave, so she provided a list of functional requirements.

### Requirements
* Each user will have a **unique** id, and he will authenticate using a **non-empty name** and a **password**.
* Each user will be able to save a list of songs. Each song will have an **artist** and **title**, and each list will be defined by a **unique** id and a name.
* The system have to allow the following actions
    * Create a new list with a given name (auto-generate the **unique** id)
    * Get the users lists
    * Get an individual list for the user
    * Add songs to a given list (based on the generated id)
    * All endpoints have to be secured with Basic Auth (using name & password) 
* You should ensure that the password is strong enough

You can find the swagger documentation for the expected API on the [doc](./doc/swagger.yaml) folder.
### What are we looking for?

* **A well-designed solution and architecture** Avoid duplication, extract re-usable code
where makes sense. We want to see that you can create an easy-to-maintain codebase.
* **Storage** We do not need a full fledged database rollout, its ok to save your data on memory for now. _However_ we are looking for an architecture that allows us to add a database as easy as possible. For a start, you can find a users database in json format on the _doc_ folder.
* **Testing** Try to create tests covering the main functionalities of your code. Feel free to create both unit tests and functional tests.
* **Documentation** The CEO has a non-tech background so try to explain your decisions, 
as well as any other technical requirement (how to run the API, external dependencies, etc ...)

[^ Go top](#spotlist-api)

## External dependencies
 - [Express](https://expressjs.com/)
 - [Nodemon](https://nodemon.io/)
 - [AJV](https://ajv.js.org/)
 - [LowDb](https://github.com/typicode/lowdb)
 - [EsLint](https://eslint.org/)
 - [c8](https://github.com/bcoe/c8)
 - [Mocha](https://mochajs.org/)
 - [Chai](https://www.chaijs.com/)
 - [Chai-HTTP](https://www.chaijs.com/plugins/chai-http/)
## Installation & Init
~~~bash
# Installation
cd js-express-mocha
npm i
# Initialization
npm start
# Dev mode
npm run dev
~~~
## Runing tests
~~~bash
cd js-express-mocha
# No coverage
npm run test
# With coverage
npm run test:cov
~~~
[^ Go top](#spotlist-api)
## Usage

> The {domain-name} by default is http://localhost:3001. Moreover to be able to use all of this endpoints you need to provide a basic authentication in the header of the request. 

### Postman
You can find postman collection file on [doc folder](./doc/spotlist.postman_collection.json)

### GET all user lists
> You can use any of user Id of [db.json](../rviewer-spotlist-api/js-express-mocha/database/db.json)
```bash
{domain-name}/users/:userId/lists
```

### GET user list by Id
> You can use any of user and list Id of [db.json](../rviewer-spotlist-api/js-express-mocha/database/db.json)
```bash
{domain-name}/users/:userId/lists/:listId
```

### POST new user list
> To make POST request to SpotList API you need to pass a body in the request here you can find further reading [HTTP - POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
#### List example without
```javascript
{
  list: {
    name: "newListName"
  }
}
```
#### List example with song
```javascript
{
  name: "newListName",
  songs: [
    {
      artist: 'artistName',
      title: 'songTitle',
    },
  ],
}
```
``` bash
{domain-name}/users/:userId/lists
```
### POST song to list

#### Song example
```javascript
{
  artist: 'artistName'
  title: 'songTitle',
}
```

```bash
{domain-name}/users/:userId/lists/:listId/songs
```

[^ Go top](#spotlist-api)