import Popup from "reactjs-popup";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Model from "./Model";
import { Formik,Form } from "formik";
import * as Yup from 'yup';
import InputArea from "../components/InputArea";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { EmailOutlined } from "@mui/icons-material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';


const ProfileEdit = ({ onClose , profileData}) => {
    const ProfileSchema = Yup.object().shape({
        firstName:Yup.string().required("Required"),
        lastName:Yup.string().required("Required"),
        email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email').required("Required"),
        
        mobile : Yup.string()
        .max(10,"Only 10 digits")
        .min(10,"Minimum 10 digits")
        .matches(/^\d{10}$/, 'Invalid phone number')
        .required("Required"),
    })

    const handleUserUpdate = async(values)=>{
      try {
        console.log("Values are: ",values);
        const response = await axios.put('http://localhost:3001/userDetailsUpdate',values,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Button triggered");
        
      } catch (error) {
        console.log("Error:",error);
      }
    }

  return (
    <Popup
      open={true}
      modal
      nested
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <div className="w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20">
        <div className="modal p-5 bg-white rounded-lg w-[50%] lg:w-[50%] h-auto border-[2px] border-[#a57eff] relative ">
          <div className="flex flex-row justify-end w-full ">
            <div
              className="w-[22px] h-[22px] rounded-full text-[#a57eff] cursor-pointer top-1 right-1 absolute"
              onClick={onClose}
            >
              <CancelIcon />
            </div>
          </div>

          <h3 className="text-[#a57eff] text-[16px] mt-3 text-center">
            Edit Profile
          </h3>

          <Formik
    initialValues={{ 
      email:profileData.email,
      mobile:profileData.mobile,    
      firstName:profileData.firstName,
      lastName:profileData.lastName,
      city:profileData.city,
      school:profileData.school
       }}


     validationSchema={ProfileSchema}
     onSubmit={handleUserUpdate}
   >
     {({errors,touched,handleChange,values})=>(
        <Form className="flex flex-col mb-30">
         
         {/* <Grid container spacing={8}> */}
              {/* <Grid item xs={8} sm={4}> */}
              <div className="w-full justify-between items-center flex-col flex space-x-1">
              <div className="w-1/2">
                <InputArea
                  Label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                </div>
              {/* </Grid> */}
              {/* <Grid item xs={8} sm={4}> */}
              <div className="w-1/2">
                <InputArea
                  Label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}  
                />
                </div>
              {/* </Grid> */}
              
              {/* <Grid item xs={8} sm={4}> */}
              <div className="w-1/2">
                <InputArea
                  Label="Email"
                  placeholder="Email"
                  name="email"
                  icon={<EmailOutlined/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                </div>
              {/* </Grid> */}

              

              {/* <Grid item xs={8} sm={4}> */}
              <div className="w-1/2">
                <InputArea
                  Label="Contact"
                  placeholder="Mobile Number"
                  name="mobile"
                  icon={<PhoneIphoneIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                </div> 

                <div className="w-1/2">
                <InputArea
                  Label="School"
                  placeholder="School"
                  name="school"
                  icon={<PhoneIphoneIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                </div> 
                <div className="w-1/2">
                <InputArea
                  Label="City"
                  placeholder="City"
                  name="city"
                  icon={<PhoneIphoneIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                </div> 
                </div>

                <div className="w-full justify-between items-center flex-col flex space-x-0">
                <button type="submit" className="w-1/3 rounded-md bg-gradient-to-r from-[#a57eff] to-[#8f5ffe] my-3 text-[#ffffff] ">
                  Update
                </button>
                </div>

               
              {/* </Grid>  */}
             
            {/* </Grid>    */}
               
        </Form>
     )}
   </Formik>
        </div>
      </div>
    </Popup>
  );
};

export default ProfileEdit;
