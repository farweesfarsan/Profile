function Primarybutton({label , eventName, bgColor, textColor, type, bgGradient }){


    const buttonStyle = {
       color:textColor,
    }

    return(
         <div>
             <button 
             type={type}
             style={buttonStyle}
             onClick={eventName}
             className="w-full rounded-md h-[44px] mt-10 bg-gradient-to-r from-purple-500 to-blue-700">
            {label}     
             </button>
         </div>
        
    );
}

export default Primarybutton;
