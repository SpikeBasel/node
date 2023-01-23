const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Lessons
router.get('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  res.send(await lessons.find({}).toArray());
  return;
});

// Add Lessons
router.post('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.insertOne({
    topic: req.body.topic,
    location: req.body.location,
    price: req.body.price,
    createdAt: new Date()
  });
  res.status(201).send();
  return;
});

// Update Lessons
router.put('/:id', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $inc: { space: -1 }}
  );
  res.status(201).send();
  return;
});

// Delete Lessons
router.delete('/:id', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
  return;
});

async function loadLessonsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://test:test@cluster0.3fipndn.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('test').collection('lessons');
}

module.exports = router;
