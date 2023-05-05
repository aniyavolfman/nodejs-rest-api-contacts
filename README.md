# Contact Management App

This is a simple Node.js application for managing a list of contacts. 
It uses MongoDB database to store the contacts data and provides RESTful API endpoints to perform CRUD operations.
Сontains user authentication.

## Prerequisites

Before running the application, you need to have the following installed on your system:

- Node.js (version 14 or later)
- MongoDB (version 4.0 or later)

## Installation

Clone the repository:

```bash
git clone https://github.com/aniyavolfman/nodejs-rest-api.git
```
Install the dependencies:

```bash
npm i
```
Create a .env file in the root directory of the project with the following environment variables:

```bash
DB_HOST=
PORT=
SECRET_KEY=
META_PASSWORD=
BASE_URL=
```

Start the application:
```bash
npm run start:dev
```
## API Endpoints

The following API endpoints are available:

- POST /api/auth/users/register :
User registration.

- GET /api/auth/users/verify/:verificationToken:
User verification.

- POST /api/auth/users/verify:
Resending an email request.

- POST /api/auth/users/login :
User authorization.

- GET /api/auth/users/current :
Get current user.

- POST /api/auth/users/logout :
User logout.

- PATCH /api/auth/users/avatars:
Update user`s avatar.

- GET /api/contacts : 
Get a list of all contacts.

- GET /api/contacts/:contactId : 
Get a contact by ID.

- POST /api/contacts : 
Add a new contact.

- PUT /api/contacts/:contactId : 
Update a contact by ID.

- PATCH /api/contacts/:contactId/favorite :
Update a contact favorite option.

- DELETE /api/contacts/:contactId : 
Delete a contact by ID.

## Current user  and  Logout request:

```javascript
Authorization: "Bearer {{token}}"
```
## Update user`s avatar request:

```javascript
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: завантажений файл
```
## Request Body Schema

The request body for user registration and authorization must follow the following schema:

```javascript
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```
The name and email are required.

The request body for resending an email request must follow the following schema:

```javascript
{
  "email": "example@example.com"
}
```

The request body for creating or updating a contact must follow the following schema:

```javascript
{
  "name": "Wylie Pope",
  "email": "est@utquamvel.net",
  "phone": "(692) 802-2949",
  "favorite": true
}
```
The name, email, and phone fields are required, and the favorite field is optional.

The request body for updating a contact favorite option must follow the following schema:

```javascript
{
  "favorite": true
}
```
## Response Body Schema

- GET /api/contacts : 

```javascript
[
  {
    "_id": "64353a1fd2ba11b789924ae3",
    "name": "Allen Raymond",
    "email": "nulla.ante@vestibul.co.uk",
    "phone": "(992) 914-3792",
    "favorite": false
  },
  {
    "_id": "64353a1fd2ba11b789924ae6",
    "name": "Wylie Pope",
    "email": "est@utquamvel.net",
    "phone": "(692) 802-2949",
    "favorite": true
  }
]
```
- GET /api/contacts/:contactId : 

```javascript
{
  "_id": "64353a1fd2ba11b789924ae6",
  "name": "Wylie Pope",
  "email": "est@utquamvel.net",
  "phone": "(692) 802-2949",
  "favorite": true
}
```
- POST /api/contacts : 

```javascript
{
  "name": "Willy",
  "email": "est@utquamvel.net",
  "phone": "(692) 802-2949",
  "favorite": true,
  "_id": "6437fff0959ac8ff03bebe1d",
  "createdAt": "2023-04-13T13:13:20.871Z",
  "updatedAt": "2023-04-13T13:13:20.871Z"
}

```
- PUT /api/contacts/:contactId : 

```javascript
{
  "_id": "6437fff0959ac8ff03bebe1d",
  "name": "Willy Pepper",
  "email": "est@utquamvel.net",
  "phone": "(692) 802-2949",
  "favorite": true,
  "createdAt": "2023-04-13T13:13:20.871Z",
  "updatedAt": "2023-04-13T13:17:03.905Z"
}
```
- PATCH /api/contacts/:contactId/favorite :

```javascript
  {
  "_id": "6437fff0959ac8ff03bebe1d",
  "name": "Willy Pepper",
  "email": "est@utquamvel.net",
  "phone": "(692) 802-2949",
  "favorite": false,
  "createdAt": "2023-04-13T13:13:20.871Z",
  "updatedAt": "2023-04-13T13:18:40.778Z"
}
```

- DELETE /api/contacts/:contactId : 

```javascript
 {
  "message": "contact deleted"
}
```
## Error Handling

The API endpoints return error responses with code and message.

