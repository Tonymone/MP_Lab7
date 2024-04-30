const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Dummy in-memory data store (replace with a real database if needed)
let users = [];

// POST endpoint to add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET endpoint to fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET endpoint to fetch a user by username
app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE endpoint to delete a user by username
app.delete('/users/:username', (req, res) => {
    const { username } = req.params;
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send(); // No content response
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
