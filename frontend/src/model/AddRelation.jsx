import Popup from "reactjs-popup";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

import { Formik,Form } from "formik";
import * as Yup from 'yup';
import InputArea from "../components/InputArea";
import axios from "axios";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const AddRelation = ({ onClose}) => {
     const [successMessage,setSuccessMessage] = useState(null);

    const RelationSchema = Yup.object().shape({
        firstName:Yup.string().required("Required"),
        lastName:Yup.string().required("Required"),
        
    })

   const handleRelation = async (values, {resetForm})=>{
       try {  

              const token = localStorage.getItem("token");
              if(!token){
                throw new Error('No Token found');
              }

              const response = await axios.post("http://localhost:3001/addRelation",values,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
                  setSuccessMessage("Relation assigned Successfully");
                  console.log(response.data.message);
                  resetForm();
         } catch (error) {
              console.log("Error is : " , error)
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
           Add Relation
          </h3>

          <Formik
    initialValues={{ 
         
      firstName:"",
      lastName:"",
      relation:""
      }}


     validationSchema={RelationSchema}
     onSubmit={handleRelation}
    
   >
     {({errors,touched,handleChange,values})=>(
        <Form className="flex flex-col mb-30">
         
        
              
                <InputArea
                  Label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}
                />
                
              
                <InputArea
                  Label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}  
                />

                <InputArea
                  Label="Relation"
                  placeholder="Relation"
                  name="relation"
                  icon={<PersonOutlineIcon/>}
                  type="text"
                  handleChange={handleChange}
                  values={values}  
                />
                
                
               

                <div className="w-full justify-between items-center flex-col flex space-x-0">
                <button type ="submit" className="w-1/3 rounded-md bg-gradient-to-r from-[#a57eff] to-[#8f5ffe] my-3 text-[#ffffff] ">
                 Add Relation
                </button>
                </div>

               
              
               
        </Form>
     )}
   </Formik>
        </div>
      </div>
    </Popup>
  );
};

export default AddRelation;
