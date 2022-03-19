

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const surveyRoutes = require('./routes/survey');
const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');
const categoryRoutes = require('./routes/category');
const groupRoutes = require('./routes/group');
const surveypassRoutes = require('./routes/surveypass');
const surveycorrectRoutes = require('./routes/surveycorrect');
const suggestionRoutes = require('./routes/suggestion');
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/success").then(
          () => {console.log('Connecté à la base de donnée de MongoDB') },
          err => { console.log('Error when connecting to the database'+ err)}
);
app.use('/api/survey', surveyRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/surveypass', surveypassRoutes);
app.use('/api/surveycorrect', surveycorrectRoutes);
app.use('/api/suggestion', suggestionRoutes);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


module.exports = app;