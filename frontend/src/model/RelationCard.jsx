import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function RelationCard({relationData,onDelete}){

   
    return(
       <div className="p-2 w-1/3">
          
             <div className="w-full p-2 border-[1px] rounded-md border-[#565656] border-opacity-30 flex flex-col relative">
             <div className="absolute top-2 right-2 text-[#838383] hover:text-[#a573ff] text-xs hover:scale-125 cursor-pointer" onClick={onDelete}><DeleteOutlineIcon/></div>
                 <h2 className="font-semibold text-base text-slate-800">{relationData.firstName} {relationData.lastName}</h2>
                 <h2 className="text-xs text-gray-500">{relationData.relation}</h2>
             </div>
       </div>
    );
}
export default RelationCard;