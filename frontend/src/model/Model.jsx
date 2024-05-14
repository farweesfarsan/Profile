// import React from "react";

// import Avatar from '@mui/material/Avatar';
// import CancelIcon from '@mui/icons-material/Cancel';


// function Model(props) {
//     const {text,handleClose,customClassName,avatar,btnText} = props;
    
        
//     return (
        
        
//         <div className="w-screen h-screen bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 right-0 flex justify-center items-center">
//             <div className="bg-white p-11 rounded-md shadow-md flex flex-col items-center border-[3px] border-[#a57eff]">
//                 <div className="flex flex-row justify-end w-full">
//                     <div className="w-[28px] h-[28px] rounded-full bg-[#a57eff] text-[#ffffff] justify-center items-center cursor-pointer absolute top-0 right-0 ">
//                       <CancelIcon/>
//                     </div>

//                 </div>
//                 <div>
//                 {avatar}   
//                 </div>
//                 <h3 className="text-center my-3 text-[#dd2e2e] font-semibold ">{text}</h3>
//                 <div className="mt-2">
//                     <button className={customClassName} onClick={handleClose} >{btnText}</button>
                    

                    
//                 </div>
//             </div>
//           </div>
        
//     );
//            //"outline outline-1 px-4 py-1 hover:bg-black hover:text-white rounded-md font-semibold"
//            //<Avatar sx={{ m: 1, bgcolor: '#ee4646', margin: 'auto' }}>
//            //<ErrorOutlineIcon className="text-[#ffffff] text-6xl" />
//           // </Avatar>
// }

// export default Model;


import React from "react";
// import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';

function Model(props) {
    const { text, handleClose, customClassName, avatar, btnText } = props;

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 right-0 flex justify-center items-center">
            <div className="bg-white p-11 rounded-md shadow-md flex flex-col items-center border-[3px] border-[#a57eff] relative"> {/* Add relative positioning */}
                <div className="absolute top-1 right-1 z-10 "> {/* Adjust positioning of the Cancel icon */}
                    <div className="w-[28px] h-[28px]  text-[#a57eff]  justify-center items-center cursor-pointer" onClick={handleClose}>   
                        <CancelIcon />   
                    </div>
                </div>
                <div>
                    {avatar}
                </div>
                <h3 className="text-center my-3 text-[#dd2e2e] font-semibold ">{text}</h3>
                <div className="mt-2">
                    <button className={customClassName} onClick={handleClose}>{btnText}</button>
                </div>
            </div>
        </div>
    );
}

 export default Model;