const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://learn-frontend-static.s3-website-ap-south-1.amazonaws.com',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// MongoDB connection
const uri =
  'mongodb+srv://dhanush:dhanush@cluster0.ar7z0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your MongoDB URI if needed
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

connectToDB();

// Register endpoint
app.post('/register/signup', async (req, res) => {
  try {
    const db = client.db('learninghub');
    const collection = db.collection('users');
    const user = await collection.insertOne(req.body);
    res.status(200).json({ message: 'Registered Successfully', result: user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login/signin', async (req, res) => {
  try {
    const db = client.db('learninghub');
    const collection = db.collection('users');
    const user = await collection.findOne({
      collegeid: req.body.collegeid,
      password: req.body.password,
    });
    if (user) {
      res.status(200).json({ message: 'Login Successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});
app.post('/adminlogin/signin', async function (req, res) {
  let conn;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Email and Password Fields are Missing');
      res.status(400).json({ error: 'All Fields are required' });
    }
    conn = await client.connect();
    const db = conn.db('Learningapp');
    const collection = db.collection('adminusers');
    const user = await collection.findOne({ email });
    if (!user) {
      console.log('User not found');
      res.status(400).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login Successful' });
    await conn.close();
  } catch (err) {
    if (conn) await conn.close();
    console.error('Error in login route:', err.message); // Log error details
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
});

app.get('/admin/users', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Learningapp'); // Use the correct DB name
    const collection = db.collection('users'); // Collection to fetch users from

    // Retrieve all users (you can also add pagination or filters if needed)
    const users = await collection.find().toArray();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Send the retrieved users data as JSON
    res.status(200).json(users);
  } catch (err) {
    console.error('Error in retrieving users:', err.message); // Log the error details
    res
      .status(500)
      .json({ error: 'Failed to retrieve users', details: err.message });
  } finally {
    if (conn) await conn.close(); // Close the database connection
  }
});

app.get('/viewall/users', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Learningapp');
    const collection = db.collection('adminusers');

    const adminusers = await collection.find().toArray();
    if (!adminusers || adminusers.length === 0) {
      return res.status(200).json({ error: 'Data Not found' });
    }
    res.status(200).json(adminusers);
  } catch (err) {
    console.error('Error in retrieving users:', err.message);
    res
      .status(500)
      .json({ error: 'Failed to retrieve users', details: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

app.post('/add/users', async (req, res) => {
  let conn;
  try {
    const { collegeid, name, email, contact, password } = req.body;

    // Check if all fields are present
    if (!collegeid || !name || !email || !contact || !password) {
      return res.status(400).json({ message: 'All Fields are required' });
    }

    // Connect to MongoDB
    conn = await client.connect();
    const db = conn.db('Learningapp');
    const collection = db.collection('users');

    // Check if the user already exists by email
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert the new user without password hashing
    const result = await collection.insertOne({
      collegeid,
      name,
      email,
      contact,
      password,
    });

    res.status(200).json({ message: 'Added User Successfully', result });
  } catch (err) {
    console.error('Error:', err.message);
    res
      .status(500)
      .json({ message: 'Failed to Add User', details: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

app.post('/api/courses', async (req, res) => {
  let conn;
  try {
    const {
      name,
      description,
      category,
      duration,
      price,
      instructor,
      videoUrl,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !description ||
      !category ||
      !duration ||
      !price ||
      !instructor ||
      !videoUrl
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Connect to the database
    conn = await client.connect();

    const db = conn.db('Learningapp'); // Assuming you have the database name set in your client

    // Insert the course into the database
    const result = await db.collection('courses').insertOne({
      name,
      description,
      category,
      duration,
      price,
      instructor,
      videoUrl,
      createdAt: new Date(), // Adding a timestamp for when the course was added
    });

    // Check if the insertion was successful
    if (result.insertedId) {
      res
        .status(201)
        .json({ message: 'Course added successfully', id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to add course' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) {
      await conn.close(); // Close the connection
    }
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('Learningapp'); // Ensure 'Learningapp' is correct
    const courses = await db.collection('courses').find().toArray(); // Fetch all courses

    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found' });
    }

    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res
      .status(500)
      .json({ error: 'Failed to fetch courses', details: err.message });
  } finally {
    await client.close();
  }
});

app.post('/feedback/submit', async (req, res) => {
  let conn;
  try {
    const { name, email, description, contact } = req.body;

    // Validate input fields
    if (!name || !email || !description || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    conn = await client.connect();
    const db = conn.db('Learningapp');
    const result = await db.collection('feedback').insertOne({
      name,
      email,
      description,
      contact,
      createdAt: new Date(),
    });
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedbackId: result.insertedId,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) await conn.close();
  }
});
