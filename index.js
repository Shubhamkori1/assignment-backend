require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');


const tasksRouter = require('./src/routes/tasks');
const authRouter = require('./src/routes/auth');



const app = express();
// app.use(cors());

const allowedOrigin = ['https://assignment-frontend-akyzpyw3t-shubhamkori1s-projects.vercel.app','https://assignment-frontend-wine.vercel.app'];

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());


app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);



app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('Mongo connection error:', err);
});