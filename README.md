
# Subscribtion Task - MERN STACK

This application will handle user subscriptions. 

## How to run?

In order to run application you should have NODE.js, NPM installed!
As I am not backend developer, I tried my best to have BE running. 
After cloning this git repo, you should use :
```bash
  npm install
```

for both BE and FE.

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



## API ENDPOINTs

- http://localhost:5000/subscribtion/add-new-email - POST
- http://localhost:5000/subscribtion/fetch-all-emails - GET
- http://localhost:5000/subscribtion/delete-email-address/:id - DELETE
- http://localhost:5000/subscribtion/sort-email-providers - GET
- http://localhost:5000/subscribtion/filter?emailprovider=hubspot&search=tutu10@hubspot.com&sorting_by_date=-1 - GET

## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express

