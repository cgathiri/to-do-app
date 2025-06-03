# To-Do Web App
A simple full-stack to-do list application with user authentication, built using **Node.js**, **Express**, **MongoDB**, and **EJS**.

# Features
- User registration & login
- Add, delete, and mark to-do taks as complete/incomplete
- Persistent to-do lists for each user
- Vertical scroll position retained after reload

# Tech Stack
- Backend: Node.js, Express
- Frontend: EJS templating
- Database: MongoDB (via Mongoose)
- Styling: CSS
- Authentication: Express sessions

# Folder Structure
to-do-app/
├── models/ # Mongoose schemas (User, ToDo)
├── routes/ # Route files for auth and todos
├── views/ # EJS templates
├── public/ # Static CSS files
├── .gitignore
├── package.json
├── server.js
└── README.md
