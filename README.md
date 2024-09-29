# WTWR (What to Wear?): Back End

This back-end project focuses on creating a server using Node.js, Express, and MongoDB for the WTWR application. The files are organized into three main folders: controllers, routes, and models.

The models folder contains the schemas for the database collections.
The controllers folder handles the server logic.
The routes folder defines the API endpoints.

Available API Endpoints:

Users:

GET /users — Returns all users.
GET /users/:userId — Returns a user by their \_id.
POST /users — Creates a new user.

Clothing Items:

GET /items — Returns all clothing items.
POST /items — Creates a new item.
DELETE /items/:itemId — Deletes an item by its \_id.
Data is automatically stored in MongoDB. Error handling mechanisms are in place to help prevent application crashes.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
