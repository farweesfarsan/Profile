const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const cors = require('cors');

const authmiddleware = require('../middleware/authmiddleware');
const Relation = require('../models/Relation');

//
require('dotenv').config();
//

// Use multer to handle form-data
// const upload = multer();



////////////  add new User //////////////

router.post('/addNewUser', async (req, res) => {
  console.log('sent by the client- ', req.body);
  const { firstName, lastName, email, password, userID, mobile ,city,school} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new User({
      userID,
      password: hashedPassword,
      email,
      mobile,
      firstName,
      lastName,
      city,
      school
      
      
       
    }); 
    await user.save();
    res.send({ message: "User Registered successfully" });
  } catch (error) {
    console.log('Database error ', error);
    return res.status(422).send({ error: error.message });
  }
});





 
// POST route for user login
router.post('/userLogin', async (req, res) => {
  const { userID, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(401).send({ error: 'user Not Found' });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }
    // Generate the JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{
      expiresIn:"10m"
    });
    // Send the token back to the client
    res.send({ token });
    // res.status(200).json({token,message:"User signed successfully"});
  } catch (error) {
    console.log('Database error ', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.get('/loggedUserBio',authmiddleware, async(req,res)=>{
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if(!user){
       return res.status(404).json({error:'User not found!'});
    }
    
    res.json({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      mobile:user.mobile,
      userID:user.mobile,
      city:user.city,
      school:user.school
    })

  } catch (error) {
    console.error('Error fetching user Details ',error);
    res.status(500).json({error:"Internal Server Error"});
  }
})

router.put('/userDetailsUpdate',authmiddleware,async(req,res)=>{
  try {
    const userId = req.userId;
    const {firstName,lastName,mobile,email,school,city} = req.body;
    const user = await User.findById(userId);

    if(!user){
     return res.status(404).json({error:"User not found!"});
    }
    if(firstName){
      user.firstName = firstName;
    }
    if(lastName){
      user.lastName = lastName;
    }
    if(email){
      user.email = email;
    }
    if(mobile){
      user.mobile = mobile;
    }
    if(school){
      user.school = school;
    }
    if(city){
      user.city = city
    }
    await user.save();
    res.json({message:"User Details Updated Successfully"});

    
  } catch (error) {
    console.log(error);
    
  }
})

router.post('/addRelation',authmiddleware,async (req,res)=>{
  try {
    const userId = req.userId;
    const {firstName,lastName,relation} = req.body;

    const newRelation = new Relation({
      firstName,
      lastName,
      relation
    })

    await newRelation.save();

    const user = await User.findById(userId);

    if(!user){
     return res.status(404).json({error:"User not found"});
    }

    user.relationIds.push(newRelation._id);
    await user.save();
    res.json({
      message:"User Registered Successfully"
    })
    
  } catch (error) {
    console.error("Error adding Relation",error);
   return res.status(500).json({error:"Internal server error"})
    
  }
})

router.get('/userRelations',authmiddleware, async (req,res)=>{

  try {

  const userId = req.userId;
  const user = await User.findById(userId).populate('relationIds');

  if(!user){
   return res.status(404).json({error:"User not found!"});
  }

  const relations = user.relationIds.map(relation=>({
    id:relation._id,
    firstName:relation.firstName,
    lastName:relation.lastName,
    relation:relation.relation
     
  }))
  res.json(relations);
    
  } catch (error) {
    console.log("Error:",error);
  } 
})

router.delete('/deleteRelation/:id',authmiddleware, async (req,res)=>{
  try {

    const relationId = req.params.id;
    console.log("Clicked Object Id Return from Home", req.params.id);
    await Relation.findByIdAndDelete(relationId);

    const user = await User.findOneAndUpdate(
      { relationIds:relationId},
      {$pull:{relationIds:relationId}},
      {new:true}
    )

    if(!user){
     return res.status(400).json({error:"User not found"});
    }

    res.json({message:"User Deleted Successfully!"});
    
  } catch (error) {
    
  }
})




  
  module.exports = router;