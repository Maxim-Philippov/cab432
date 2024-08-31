const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
const path = require('path'); 
var cors = require('cors')

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const videoRoutes = require('./routes/videos');
const transcodingRoutes = require('./routes/transcodingSettings')
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', registerRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/transcoding-settings', transcodingRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect("mongodb://localhost:27017/image-editor").then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log("Connected to MongooseDB")
} ).catch((error)=> {
    console.log(error)
})