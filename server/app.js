const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port number ${PORT}`));

const uri =
  'mongodb+srv://dhanush:dhanush@cluster0.ar7z0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

app.get('/klef/test', async function (req, res) {
  res.json('Koneru Lakshmaiah Education Foundation');
});

app.post('/klef/cse', async function (req, res) {
  res.json(req.body);
});

app.get('/', (req, res) => {
  res.send('Welcome to Learning Hub!');
});

app.post('/register/signup', async (req, res) => {
  let conn;
  try {
    const { collegeid, name, email, contact, password, confirmPassword } =
      req.body;
    if (
      !collegeid ||
      !name ||
      !email ||
      !contact ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ error: 'All Fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    conn = await client.connect();
    const db = conn.db('Learningapp');
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne({
      collegeid,
      name,
      email,
      contact,
      password,
    });
    await conn.close();

    res.status(200).json({ message: 'Registered Successfully', result });
  } catch (err) {
    if (conn) await conn.close();
    res.status(500).json({ error: 'Failed to register', details: err.message });
  }
});

app.post('/login/signin', async function (req, res) {
  let conn;
  try {
    const { collegeid, password } = req.body;

    if (!collegeid || !password) {
      console.log('Collegeid or password missing');
      return res
        .status(400)
        .json({ error: 'collegeid and password are required' });
    }

    // Use the existing global client connection
    const db = client.db('learninghub'); // Match with registration database
    const collection = db.collection('users');

    const user = await collection.findOne({ collegeid });

    if (!user) {
      console.log('User not found for collegeid:', collegeid);
      return res.status(400).json({ error: 'Invalid collegeid or password' });
    }

    const passwordMatch = user.password === password; // Assuming plain text for now

    if (!passwordMatch) {
      console.log('Password mismatch for collegeid:', collegeid);
      return res.status(400).json({ error: 'Invalid collegeid or password' });
    }

    console.log('Login successful for user:', collegeid);
    res.status(200).json({
      message: 'Login successful',
      user: { collegeid: user.collegeid },
    }); // Return user info
  } catch (err) {
    console.error('Error in login route:', err.message);
    res.status(500).json({ error: 'Failed to login', details: err.message });
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
