const jwt = require('jsonwebtoken');
require('dotenv').config();

const authmiddleware = (req,res,next)=>{

    const authHeader = req.header('Authorization');
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"Token not Provided!"});
    }

    try {
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         req.userId = decoded.userId;
         next();
    } catch ({error}) {
          console.log("Authentication Error",error);
          return res.status(401).json({error:"Invalid Token!"});
    }
}

module.exports = authmiddleware;