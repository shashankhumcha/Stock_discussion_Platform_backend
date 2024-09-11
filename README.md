# Stock Discussion Platform

A web-based platform for users to discuss stocks, create posts, comment, and like or unlike posts. Built using Node.js, Express, MongoDB, and JWT for authentication.

### Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

### Features

- User registration and login (JWT-based authentication)
- Create, read, update, and delete posts (CRUD)
- Like and unlike posts
- Comment on posts
- User profile management

### Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Mongoose
- **Testing**: Postman

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/) for API testing

### Installation

1. Clone the repository:
    git clone https://github.com/your-username/stock-discussion-platform.git
    cd stock-discussion-platform

2. Install dependencies:
    npm install

3. Set up MongoDB:

   - Ensure MongoDB is installed and running locally or use a MongoDB Atlas URI.

4. Start the server:

    node server.js
   Server will run at `http://localhost:5000`.

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

MONGO_URI=mongodb://localhost:27017/stockCommunity
JWT_SECRET=your_jwt_secret
PORT=5000

### API Endpoints

### Authentication

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: Login and get a JWT token

### User Profile

- GET `/api/auth/profile/:userId`: Get user profile (Authenticated)
- PUT `/api/auth/profile`: Update user profile (Authenticated)

### Posts

- POST `/api/posts`: Create a new post (Authenticated)
- GET `/api/posts`: Get all posts (with filters for stockSymbol and tags)
- GET `/api/posts/:postId`: Get a specific post (with comments)
- DELETE `/api/posts/:postId`: Delete a post (Authenticated)

### Likes

- POST `/api/likes/:postId/like`: Like a post (Authenticated)
- DELETE `/api/likes/:postId/like`: Unlike a post (Authenticated)

## Testing

You can test the API endpoints using Postman:

1. Import the Postman collection into Postman.
2. Set the appropriate environment variables.
3. Run requests like registering a user, logging in, creating posts, etc.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.
