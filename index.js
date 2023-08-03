const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

mongoose
  .connect('CONNECTION STRING')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log('Error', err));

mongoose.connection.on('error', (err) => console.log('lost connection', err));

const app = express();
app.use(express.json());

async function createUser() {
  try {
    const user = {
      name: 'John Doe',
      age: 27,
      email: 'john@gMail.com',
      hobbies: ['coding', 'surfing'],
    };

    User.create(user);
  } catch (error) {
    console.log(error);
  }
}

createUser();

async function createPost() {
  try {
    const post = {
      title: 'Post one',
      description: 'This is a post',
      user: '64cb8b3ae4f9490c93a5d3ff',
    };

    Post.create(post);
  } catch (error) {
    console.log(error);
  }
}

createPost();

app.get('/getusers', (req, res) => {
  User.find()
    .then((allUsers) => {
      console.log(allUsers);
      res.send(allUsers);
    })
    .catch((err) => console.log(err));
});

app.get('/getusers/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

app.post('/createuser', (req, res) => {
  console.log(req.body);
  const { name, age, email } = req.body;

  User.create({
    name: name,
    age: age,
    email: email,
  })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

app.put('/update', (req, res) => {
  User.updateMany({ age: { $gt: 25 } }, { $set: { age: 30 } })
    .then((users) => res.send(users))
    .catch((err) => console.log(err));
});

app.get('/agethirty', (req, res) => {
  User.where('age')
    .equals(30)
    .where('name')
    .equals('John Doe')
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('App is listening on port 3000'));
