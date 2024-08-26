const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");
const socketIo = require('socket.io');  // Import socket.io

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const Post = require('./models/Post');
const authenticate = require("./middleware/authenticate");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3001;

// Middleware and Routes (same as before)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// MongoDB Connection (same as before)
const dbURI = 'mongodb://localhost:27017/users';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Routes
app.use('/', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/accounts/signup', (req, res) => {
    res.render('signup');
});

app.get('/accounts/login', (req, res) => {
    res.render('login');
});

app.get('/accounts/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200);
    res.redirect('/accounts/login');
});

app.get('/test-image', (req, res) => {
    res.render('test-image');
});

app.get('/', authenticate, async (req, res) => {
    console.log(req);
    
    try {
        const posts = await Post.find()
            .populate('user', 'firstname lastname othernames username followers')
            .populate('comments.user', 'firstname lastname othernames username')
            .populate('likes', 'firstname lastname othernames username');

        res.render('index', { posts, userId: req.userId });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
});

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
