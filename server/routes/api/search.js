const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.post('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  const data = await lessons.find({}).toArray();
  let search = req.body.search;
  let find = data.filter(val => val.location.match(search))
  res.send(find)
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
