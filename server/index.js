require('dotenv').config(); // Remove this line as it's no longer needed
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Ensure credentials are included for cookies

// Hardcoded MongoDB URI
const mongoURI = "mongodb+srv://sachinyadavpy23:TYPtOOiziGuBMt42@databasemood.4it00.mongodb.net/?retryWrites=true&w=majority&appName=databasemood";

// Session Configuration
app.use(
  session({
    secret: 'theveryraresecret', // Hardcoded session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    cookie: { secure: false, httpOnly: true }, // Not using secure cookies for development
  })
);

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Signup Route
app.post(
  '/signup',
  // Validate inputs
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username }, // Include user details in the token
    'your_jwt_secret', { expiresIn: '1h' }
  );
  res.status(200).json({ message: 'Login successful', token });
});



// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
