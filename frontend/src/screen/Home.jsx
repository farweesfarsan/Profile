import React, { useEffect, useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from '../Assets/pexels-julian-jagtenberg-103123.jpg'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from "react-router-dom";
import ProfileEdit from "../model/ProfileEdit";
import axios from "axios";
import AddRelation from "../model/AddRelation";
import RelationCard from "../model/RelationCard";

function Home(){

    const navigate = useNavigate();
    const [userData,setUserData] = useState(null);
    const [PopupOpen,setPopupOpen] = useState(false);
    const [PopupOpenRelation,setPopupOpenRelation] = useState(false);
    const [relationData,setRelationData] = useState([]);
    

   

    const getUserData = async ()=>{

        try {

          const token = localStorage.getItem("token");
          
          if(!token){
            console.log("token not found");
          }
          
          const response = await axios.get('http://localhost:3001/loggedUserBio',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
          });
          setUserData(response.data);
          console.log(userData);
            
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(()=>{
          getUserData();


          const handleMouseMove = ()=>{
           
            const token = localStorage.getItem('token');

            if(!token){
                window.location.reload();
            }
        
          }

          document.addEventListener('mousemove',handleMouseMove);

          return()=>{
          document.addEventListener('mousemove',handleMouseMove);
          }
    },[]);


    const getRelation = async ()=>{
        try {

            const token = localStorage.getItem('token');
            if(!token){
                console.log("token not found");
            }

            const response = await axios.get("http://localhost:3001/userRelations", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setRelationData(response.data);
            console.log("Relation Data ", relationData);

           
            
          } catch (error) {
            console.log("Error:",error);
          }
    }

    useEffect(()=>{
        getRelation();
    },[])


    const openPopUp = () =>{
        setPopupOpen(true);
    }

    const closePopUp = () =>{
        setPopupOpen(false);
    }

    const openPopUpRelation = () =>{
        setPopupOpenRelation(true);
    }

    const closePopUpRelation = () =>{
        setPopupOpenRelation(false);
    }

    const handleDeleteRelation = async (relationId)=>{
        try{
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("token not found");
            }
    
            await axios.delete(`http://localhost:3001/deleteRelation/${relationId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            })
            setRelationData((prevRelation) => prevRelation.filter(relation=>relation.id !== relationId));
        }catch(error){
            console.log("Error Deleting data: ",error);
        }
        
    }


    return(
        <div className="w-full h-screen flex flex-col justify-center items-center p-2 space-y-2">
            <div className="w-full md:w-[80%] lg:w-[60%] justify-center items-center">
               
                <span className="text-[14px]"> <ArrowBackIcon fontSize="small"/> Back</span>
            </div>

            {userData  ? (

                <>
                 <div className="w-full md:w-[80%] lg:w-[60%] md:p-5 flex flex-col space-y-2 border-[1px] rounded-md border-[#565656] border-opacity-25">
                <div className="w-full bg-slate-900 rounded-sm p-2 md:p-5 flex flex-col justify-center items-center space-y-3 relative" >
                    <div className="profile-wrapper w-[96px] h-[96px] md:w-[128px] md:h-[128px] bg-slate-400 rounded-full  relative">
                        <img src={Profile} alt="Pofile_Image" className="w-full h-full rounded-full object-cover"></img>
                        <label className="mx-auto p-2 flex justify-center items-center text-[#a573ff] bg-white cursor-pointer rounded-full absolute right-0 bottom-1">
                        <input 
                          type="file"
                          style={{display:"none"}}
                          onChange={''}
                          accept="image/"
                        />

                        <CameraAltIcon/>
                        </label>
                    </div>

                    <div className="justify-center items-center mx-auto">
                        <h1 className="text-white font-semibold text-[12px] uppercase">
                              {userData.firstName} {userData.lastName}
                        </h1>

                    </div>

                    <div className="flex flex-row space-x-3 absolute bottom-2 right-2">
                         
                    <div className="px-4 py-1 bg-[#a573ff] rounded-sm hover:bg-[#8f5ffe] cursor-pointer text-[#fafafa] transition-all ease-in-out 
                        text-[10px]  " onClick={openPopUpRelation}><EditNoteIcon/>Add Relation 
                    </div>

                    <div className="px-4 py-1 bg-[#a573ff] rounded-sm hover:bg-[#8f5ffe] cursor-pointer text-[#fafafa] transition-all ease-in-out 
                        text-[10px]  " onClick={openPopUp}><EditNoteIcon/>Edit 
                    </div>
                    </div>

                     
                     </div>

                <div className="w-full p-2 md:p-5 flex flex-col">
                    <div className="flex flex-row justify-start items-center">
                        <div className="text-[#838383] text=[10px] p-1">
                            <PhoneIcon/>
                        </div>
                       <h2 className="text-[#838383] text-[12px]">{userData.mobile}</h2>
                    </div>

                    <div className="flex flex-row justify-start items-center">
                        <div className="text-[#838383] text-[10px] p-1">
                            <MailOutlineIcon/>
                        </div>
                       <h2 className="text-[#838383] text-[12px]">{userData.email}</h2>
                    </div>

                    {userData.school ? (
                          <div className="flex flex-row justify-start items-center">
                          <div className="text-[#838383] text-[10px] p-1">
                              <MailOutlineIcon/>
                          </div>
                         <h2 className="text-[#838383] text-[12px]">{userData.school}</h2>
                      </div>

                    ) : (null)}

                    {PopupOpen && (
                       <ProfileEdit onClose={closePopUp} profileData={userData}/>
                    )}

                    {PopupOpenRelation && (
                       <AddRelation onClose={closePopUpRelation} />
                    )}

                  <div className="mt-5 mb-5 flex flex-wrap w-full">
                    {relationData && relationData.map(relation => {
                      return (
                        <RelationCard
                           key={relation.id}
                           relationData={relation}
                           onDelete = {()=>{handleDeleteRelation(relation.id)}}
                        />
                           );
                         })}
                   </div>

                </div>
            </div>
                
                </>
            ) : (
                <div className="w-1/2 mx-auto p-3 flex flex-col justify-center items-center">
                    <div className="text-[#161616] font-semibold text-[1.5rem]">
                         <h2>404 Not Found!</h2>
                         <p className="text-red-600 text-[12px]">Access Expired! Please Login again</p>
                    </div>
                    
                </div>
            )}

           
        </div>
    );
}
export default Home;