# Heimdall-backend

## Technologies Used

- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL]

## Getting Started

---

### Endpoints

- `api/v1/user`
  This endpoint adds a user.
  `Requirement`: username or email to be supplied
- `api/v1/credit`
  This endpoint credits all user with random amounts.
- `api/v1/debit`
  This endpoint debits all user with random amounts.
- `api/v1/filter`
  This endpoint filters users by name and or balance.
  `Requirement`: name or balance to be supplied
- `api/v1/withdraw/:id`
  This endpoint debit user.
  `Requirement`: amount is to be supplied

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.
- Clone repo

  ```bash
    - git clone https://github.com/victor-shagor/Heimdall-backend.git

    - cd Heimdall-backend

    - npm install/yarn

    - Create/configure `.env` environment with the following credentials
      DATABASE_URL
      DATABASE_TEST

    - Run `npm run create or yarn run create` to create database table
    _ Run `npm run populate or yarn run populate` to seed database
    - Run `npm start or yarn start` to start the server
    - cd clients
    - Run `npm start or yarn start` to start the clients
  ```

### Testing

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.
- You can also test by running `npm test`.

## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `GET` Get a data or data
- `PATCH` Update a data or data

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `Created` The request was successfully created
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `404` `Not Found` route or data not found
