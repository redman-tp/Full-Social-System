# Social Media Web Application

This is a full-stack social media web application where users can sign up, log in, create posts, follow other users, like and comment on posts, receive notifications, and more. The application uses Node.js, Express.js, MongoDB, and EJS for the frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- Create, edit, and delete posts
- Upload images and videos in posts
- Follow and unfollow other users
- Like and comment on posts
- Real-time notifications for likes, comments, and follows
- Messaging between users (planned feature)
- Responsive UI built with EJS and CSS

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, JavaScript, CSS
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer
- **Real-time Communication:** Socket.io (for notifications)
- **Templating Engine:** EJS

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/social-media-app.git
   cd social-media-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   Make sure you have MongoDB installed and running on your machine. The app connects to a local MongoDB instance by default.

4. **Environment Variables:**
   Create a `.env` file in the root of your project and add the following environment variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   DB_URI=mongodb://localhost:27017/social-media-app
   ```

5. **Run the server:**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3001`.

## Usage

- Visit `http://localhost:3001/accounts/signup` to create a new account.
- Visit `http://localhost:3001/accounts/login` to log in to your account.
- After logging in, you'll be redirected to the home page where you can create posts, follow users, like posts, and more.

## API Endpoints

### Authentication

- `POST /api/signup` - Sign up a new user
- `POST /api/login` - Log in a user
- `POST /api/logout` - Log out a user

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts/create` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Users

- `GET /api/users/:username` - Get a user's profile
- `PUT /api/follow/:id` - Follow or unfollow a user
- `GET /api/notifications` - Get all notifications for the logged-in user

## Folder Structure

```
├── models
│   ├── User.js           # User schema
│   ├── Post.js           # Post schema
│   ├── Notification.js   # Notification schema
├── routes
│   ├── users.js          # User-related routes
│   ├── posts.js          # Post-related routes
├── public                # Static files (CSS, JS)
├── views                 # EJS templates
│   ├── index.ejs         # Home page template
│   ├── signup.ejs        # Signup page template
│   ├── login.ejs         # Login page template
├── uploads               # Uploaded images and videos
├── .env                  # Environment variables
├── app.js                # Main application file
├── package.json          # Node.js dependencies and scripts
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Author
Wordsworth (Redman)

- GitHub https://github.com/redman-tp/
- Twitter https://x.com/techprophett
- LinkedIn https://www.linkedin.com/in/e-wordsworth/

```
