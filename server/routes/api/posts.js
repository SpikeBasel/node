const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/user', async (req, res) => {
  const users = await loadUsersCollection();
  res.send(await users.find({}).toArray());
  return;
});

// Add User
router.post('/user', async (req, res) => {
  const users = await loadUsersCollection();
  await users.insertOne({
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date()
  });
  res.status(201).send();
  return;
});

// Delete User
router.delete('/user/:id', async (req, res) => {
  const users = await loadUsersCollection();
  await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
  return;
});


// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
  return;
});


// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
  return;
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
  return;
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://test:test@cluster0.3fipndn.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('test').collection('posts');
}

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://test:test@cluster0.3fipndn.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('test').collection('users');
}

module.exports = router;
