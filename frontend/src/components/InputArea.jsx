import React from "react"

import { Formik,Field,Form,ErrorMessage } from "formik";
import { ImportContactsOutlined } from "@mui/icons-material";
import {TextField , InputAdornment } from "@mui/material";





function InputArea({Label , name , type , placeholder , handleChange , values,icon}){
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
            
         <div className="form-field-conmtainer w-full rounded-[6px] h-[38px] bg-[#ffffff] border border-[#565656] border-opacity-30 flex flex-row justify-center items-center">
              <div className="form-field-input-icobox bg-[#6c4cb5] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                 <span className="text-[16px] text-[#ffffff]">
                    {icon}
                 </span>
                 </div>

              
               <Field
                 type={type}
                 name={name}
                 placeholder={placeholder}
                 value={values[name]}
                 onChange={handleChange}
                 className="w-full h-full p-2 bg-[#c3e4ee] outline-none text-[12px] form-field-input "
                 required
               />    
                
          
        </div>
        
      </div>
    );
}

export default InputArea;

