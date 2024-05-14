import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Primarybutton from "../components/Primarybutton";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from "axios";
import Model from "../model/Model";
import InputArea from "../components/InputArea";
import InputPassword from "../components/InputPassword";


const Login = () => {
  const gradientColor = 'linear-gradient(to right, #ff7e5f, #feb47b)';
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleClosePopup = () =>{
    setLoginError(null);
  }

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:3001/userLogin", values);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Auth token',token);
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 10 * 60 * 1000);
      navigate('/Home');
    } catch (error) {
      if (error.response.status === 401) {
        if (error.response.data.error === 'user Not Found') {
          console.log('User not found!');
          setLoginError('User not Found, Please Check Your Credentials !');
        } else if (error.response.data.error === 'Invalid password') {
          console.log('Invalid Password!');
          setLoginError('Invalid Password,Please Check Your Credentials !');
          
        } else {
          console.error('Login failed!', error.response.data.error);
          setLoginError('Login failed !')
        }
      } else {
        console.error('Something went wrong', error.message);
        setLoginError('Something went wrong !')
      }
    }
  }

  const LoginSchema = Yup.object().shape({
    userID: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password Should have at least 6 Characters")
      .matches(/\d/, "Password Should have Numbers")
      .matches(/[a-z]/, "Password should include lowercase characters")
      // .matches(/[A-Z]/, "Password Should include Uppercase values")
      .matches(/[^\w]/, "Password Should include symbols")
      .required("Required"),
  });

  return (
    <div className="w-full p-5 h-screen flex justify-center items-center relative">
      <Formik
        initialValues={{
          userID: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form className="flex flex-col lg:w-1/2 md:w-1/2 w-full mb-20 ">
            <div className="text-center mb-10">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', margin: 'auto' }}>
                <LockOutlinedIcon />
              </Avatar>
              <h2 className="text-3xl text-[#6c4cb5]">Farwees's Vision</h2>
              <p className="text-xs text-[#a7a6b6]">Please Login to Continue</p>
            </div>

            <InputArea
              Label="UserName"
              placeholder="UserName"
              name="userID"
              type="text"
              handleChange={handleChange}
              values={values}
              icon={<AccountCircleIcon/>}
            />

            <InputPassword
              Label="Password"
              placeholder="Password"
              name="password"
              type="password"
              handleChange={handleChange}
              values={values}
              icon={<LockIcon/>}
            />

            

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Primarybutton
              label="Login"
              type="submit"
              bgGradient={gradientColor}
              textColor="#ffffff"
            />

            {loginError && (
              // <p className="text-[#ec4545] text-[12px] mt-1">{loginError}</p>
              <Model
               text={loginError}
               handleClose={handleClosePopup}
               customClassName="outline outline-1 px-4 py-1 hover:bg-black hover:text-white rounded-md font-semibold"
               avatar={<Avatar sx={{ m: 1, bgcolor: '#ee4646', margin: 'auto' }}>
               <ErrorOutlineIcon className="text-[#ffffff] text-6xl" />
               </Avatar>}
               btnText="Ok"
               
              />
            )}

            <div className="w-full justify flex flex-row justify-between mt-3">
              <h5 className="text-[12px]">
                Don't have an Account? {" "}
                <span className="text-[#6c4cb5]">
                  <Link to="/Registration">
                    Register Now
                  </Link>
                </span>
              </h5>

              <h5 className="text-[12px]">
                <span className="text-[#6c4cb5]">
                  <Link>
                    Forgot Password
                  </Link>
                </span>
              </h5>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;