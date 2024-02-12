
# CRUD API

  

## Overview

This is a simple CRUD API implemented using Node.js. It allows you to create, read, update, and delete users in a database.

  

## Installation

To install the API, you will need to have Node.js and npm installed on your system. Once you have these installed, you can clone the repository and install the dependencies by running the following commands:

  

#### bash

```https://github.com/HalinaD/crud-api.git```

```git checkout dev```

```npm install```

  

## Running

 - To run the application in development mode:

```npm run start:dev```

  

 - To run the application in production mode:

```npm run start:prod```

  

## Usage

The API provides the following endpoints:

### GET /api/users 
 -  **Description:** Retrieve all users stored in the database. 
 -  **Method:** GET
  -  **Endpoint:**  `http://localhost:{PORT}/api/users`  
  -  **Response:**  
  ```[  
{
    "id": "1",
    "username": "Alice",
    "age": 30,
    "hobbies": ["reading", "running"]
  },
  {
    "id": "2",
    "username": "Bob",
    "age": 35,
    "hobbies": ["gaming", "cooking"]
  }
 ]
  ```

  -  **Status Code:** 200 OK
     -  **Body:** An array containing all user records.  

### GET /api/users/{userId}  
-  **Description:** Retrieve a specific user by their ID. 
-  **Method:** GET
 -  **Endpoint:**  `http://localhost:{PORT}/api/users/{userId}`  
 -  **Request Parameters:**  
    -  `userId`: The unique identifier of the user to retrieve. 
 -  **Response:**  
 ``` 
{
    "id": "1",
    "username": "Alice",
    "age": 30,
    "hobbies": ["reading", "running"]
  }
  ```
  
 -  **Status Code:** 200 OK 
    -   **Body:** The user record matching the provided ID.
-   **Error Responses:**
    -   **Status Code:** 400 Bad Request
        -   **Body:** `{ "message": "Invalid userID" }`
    -   **Status Code:** 404 Not Found
        -   **Body:** `{ "message": "User not found" }`
### POST /api/users
- **Description:** Create a new user record and store it in the database.
- **Method:** POST
- **Endpoint:** `http://localhost:{PORT}/api/users`
- **Request Body:** Object containing user information:
```
{
  "username": "Charlie",
  "age": 25,
  "hobbies": ["painting", "music"]
}
```

-   **Response:**
```
{
  "id": "3",
  "username": "Charlie",
  "age": 25,
  "hobbies": ["painting", "music"]
}
```

 -   **Status Code:** 201 Created
      -   **Body:** The newly created user record.

### PUT /api/users/{userId}

-   **Description:** Update an existing user record by their ID.
-   **Method:** PUT
-   **Endpoint:** `http://localhost:{PORT}/api/users/{userId}`
-   **Request Parameters:**
    -   `userId`: The unique identifier of the user to update.
-   **Request Body:** Object containing updated user information:
```
{
  "username": "Alice",
  "age": 31,
  "hobbies": ["reading", "running", "swimming"]
}

```
-   **Response:**
```
{
  "id": "1",
  "username": "Alice",
  "age": 31,
  "hobbies": ["reading", "running", "swimming"]
}
```
  -   **Status Code:** 200 OK
      -   **Body:** The updated user record.
-   **Error Responses:**
    -   **Status Code:** 400 Bad Request
        -   **Body:** `{ "message": "Invalid userID" }`
    -   **Status Code:** 404 Not Found
        -   **Body:** `{ "message": "User not found" }`


### DELETE /api/users/{userId}

-   **Description:** Delete an existing user record by their ID.
-   **Method:** DELETE
-   **Endpoint:** `http://localhost:{PORT}/api/users/{userId}`
-   **Request Parameters:**
    -   `userId`: The unique identifier of the user to delete.
   ```
   {
  "username": "Alice",
  "age": 31,
  "hobbies": ["reading", "running", "swimming"]
}
```
-   **Response:**
    -   **Status Code:** 204 No Content
    -   **Body:** None
-   **Error Responses:**
    -   **Status Code:** 400 Bad Request
        -   **Body:** `{ "message": "Invalid userID" }`
    -   **Status Code:** 404 Not Found
        -   **Body:** `{ "message": "User not found" }`
