import React, { useState } from "react";
import { Formik,Field,Form,ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link,useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Primarybutton from "../components/Primarybutton";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WcIcon from '@mui/icons-material/Wc';
import KeyIcon from '@mui/icons-material/Key';
import { EmailOutlined } from "@mui/icons-material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InputArea from "../components/InputArea";
import axios from "axios";


const Registration = ()=>{

    const navigate = useNavigate();

   const [successMessage,setSuccessMessage] = useState(false);

    const SignupSchema = Yup.object().shape({
        firstName:Yup.string().required("Required"),
        lastName:Yup.string().required("Required"),
        password: Yup.string()
          .min(6, "Password Should have at least 6 Characters")
          .matches(/\d/, "Password Should have Numbers")
          // .matches(/[A-Z]/, "Password Should include Uppercase values")
          .matches(/[^\w]/, "Password Should include symbols")
          .required("Required"),
        email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email').required("Required"),
        
        mobile : Yup.string()
        .max(10,"Only 10 digits")
        .min(10,"Minimum 10 digits")
        .matches(/^\d{10}$/, 'Invalid phone number')
        .required("Required"),
        
        userID: Yup.string()
        .matches(/[0-9]/,"Only digits")
        
        .matches(/[A-Z]/,"UserId Requires a UpperCase letter")
        .required("Required"),
    });

    const handleRegistration = async (values,{resetForm}) =>{
      try {

        console.log('Form Data:',values);
        const response = await axios.post('http://localhost:3001/addNewUser',values)
        console.log('Response',response.data);

        if(response.data.message === 'User Registered successfully'){
          setSuccessMessage(true);
        }
        console.log('Form Reset');
        resetForm();
        // setSuccessMessage(false);
        
      } catch (error) {
        console.log('Errors',error);
       

      }
    }

    return(
        <div className="w-full p-5 h-screen flex justify-center items-center relative">
    <Formik
    initialValues={{ 
      userID: '',
      password: '',
      email:'', 
      mobile:'',    
      firstName:'',
      lastName:''
       }}


     validationSchema={SignupSchema}
     onSubmit={handleRegistration} 
   >
     {({errors,touched,handleChange,values})=>(
        <Form className="flex flex-col lg:w-1/2 md:w-1/2 w-full mb-30">
         <div className="text-center mb-10">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin:'auto' }}>
              <LockOutlinedIcon />
              </Avatar>
             <h2 className="text-3xl text-[#6c4cb5]">Farwees's Vision</h2>
             <p className="text-xs text-[#a7a6b6]">Please SignUp</p>
         </div>
         <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                  
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="Email"
                  placeholder="Email"
                  name="email"
                  icon={<EmailOutlined/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
              </Grid>

              

              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="Contact"
                  placeholder="Mobile Number"
                  name="mobile"
                  icon={<PhoneIphoneIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="UserId"
                  placeholder="UserId"
                  name="userID"
                  icon={<VerifiedUserIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputArea
                  Label="Password"
                  placeholder="Password"
                  name="password"
                  icon={<KeyIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
              </Grid>
              
            </Grid>

           <Primarybutton
           label="SignUp"
           type="submit"
           bgColor="#6c4cb5"
           textColor="#ffffff"
           />

           {
            successMessage && (
              <span className="text-green-600 text-[12px] mt-2">User Registered Successfully!</span>
            )
           }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2" className="text-[#3c86c2] underline">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>       
        </Form>
     )}
   </Formik>
        </div>
  );
}

export default Registration;