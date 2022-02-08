
# Subscribtion Task - MERN STACK

This application will handle user subscribtions. The application uses MERN stack. The whole task is done in this app. 

## How to run?

In order to run application you should have NODE.js, NPM installed!
As I am not backend developer, I tried my best to have BE running. 
After cloning this git repo, you should use :
```bash
  npm install
```

for both BE and FE. This command will help you to install all the necessary dependencies.


For frontend, yarn start is enough to run app or npm start.

```bash
  yarn start
```

or

```bash
  npm start
```

For Backend, you should have either nodemon installed or you just need to type
- node index in the commend line
in order to run BE.

```bash
  nodemon index
```

or


```bash
  node index
```

---
**NOTE**

You should run backend and frontend at the same time. If you dont, you can get "Failed to fetch!" - error.

---


## API ENDPOINTs

- /subscribtion/add-new-email - POST
- /subscribtion/fetch-all-emails - GET
- /subscribtion/delete-email-address/:id - DELETE
- /subscribtion/sort-email-providers - GET
- /subscribtion/filter?emailprovider=hubspot&search=tutu10@hubspot.com&sorting_by_date=-1 - GET

## BACKEND

- localhost:3000/backend

## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express

