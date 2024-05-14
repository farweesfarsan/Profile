const express = require('express');
const app = express();
const port = process.env.PORT||3001;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cors = require('cors');

const corsOption = {
    origin : 'http://localhost:3000'
}

app.use(cors(corsOption));

app.listen(port, ()=>{
    console.log(`Your Port is ${port}`);
})


//////////////////////////////////// import db
  require('./db');
///////////////////////////////////

  require('./models/User');    ///// import User model
  require('./models/Relation');

  const authRoutes = require('./routes/authRoutes');
  app.use(authRoutes);


app.use((req,res,next) =>{
    const error = new Error('Route not Found');
    error.status = 404;
    next(error);
})

app.use(express.json());
app.use(cors());



app.use((error,req,res,next)=>{
    res.status(err.status||500).json({error:error.message});
})

