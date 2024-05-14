import React from "react"

import { Formik,Field,Form,ErrorMessage } from "formik";
import { ImportContactsOutlined } from "@mui/icons-material";
import {TextField , InputAdornment } from "@mui/material";




function InputField({Label , name , type , placeholder , handleChange , values, icon}){
    return(
            
        <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
        <div className="form-field-label sm:flex justify-between w-full hidden">
          <span className="text-[#1a1a1a] text-[12px]  font-semibold">
             {Label}
          </span>

          <ErrorMessage
             name={name}
             component="span"
             className="text-red-600 text-[12px]"
          />
          

        </div>
         
         
              <div>
               <Field
                 type={type}
                 name={name}
                 placeholder={placeholder}
                 value={values[name]}
                 onChange={handleChange}
                 variant="outlined"
                 size="small"
                 as={TextField}
                InputProps={{
                startAdornment: (
                <InputAdornment  position="start">
                 {icon}
                </InputAdornment>
            ),
          }}
                 className="w-full  bg-[#deedf0] text-[12px] form-field-input "
                 required
                 
               />

               
          </div>
      </div>
    );
}

export default InputField;

