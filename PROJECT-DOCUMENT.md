Project Structure Overview:

taskmanager-api/
models/
controllers/
routes/
middleware/
config/
server.js
.env

Key Components Explained:

models/

- userModel.js  
  Contains the MongoDB schema for users  
  Tasks and subtasks are embedded inside the user document  
  Uses isDeleted: Boolean for soft deletion  
  Email field has a unique index to prevent duplicates

routes/

- authRoutes.js: Manages registration and login endpoints
- taskRoutes.js: Manages task and subtask API endpoints

controllers/
Contains the business logic for each endpoint, including:

- registerUser, loginUser
- getTasks, createTask, updateTask, deleteTask
- getSubtasks, updateSubtaskList, deleteSubtask

Includes validation, error handling, and user-based access filtering

middleware/

- authMiddleware.js: Verifies JWT token from headers  
  Attaches the authenticated user to req.user for downstream use  
  Protects all task and subtask routes

config/

- db.js: MongoDB connection logic using mongoose

server.js:
Main app entry point  
Loads environment variables, connects MongoDB, and sets up Express routes and middleware  
Defaults to port 5000

Design Decisions:

Embedded Documents  
Tasks and subtasks live inside the user document to keep operations user-scoped and efficient

Soft Delete Strategy  
Instead of removing tasks and subtasks from the database, they are marked with isDeleted: true  
This allows safer recovery and prevents loss from accidental deletion

JWT Authentication  
User logs in and receives a token  
Protected routes expect Authorization: Bearer <token> in headers  
Token is verified before any sensitive operation

Clean Separation  
Each layer of the project (routes → controllers → models) is kept modular for maintainability and scalability
