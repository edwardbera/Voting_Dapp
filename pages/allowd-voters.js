import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useRouter} from 'next/router';
import {useDropzone} from "react-dropzone";
import image from "next/image";
//import images from "../assets";
import { VotingContext } from '../context/voter';
import Style from '../styles/allowedvoter.module.css';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import NavBar from "../components/NavBar/NavBar";
import Popup from 'reactjs-popup';


const allowdVoters = ()=>{
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    nationalId: "",
  });


  const router = useRouter();
  const {uploadToIPFS, createVoter, connectWallet,voterArray, organizerAddress, currentAccount, error, error2} = useContext(VotingContext);

  const onDrop = useCallback(async(acceptedFil)=>{
    const url = await uploadToIPFS(acceptedFil[0]);
    setFileUrl(url);

  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,

  });

  useEffect( () =>{
    connectWallet();
    
    
    

 }, []);
   
  
  return (
    
    <div className={Style.createVoter}>

      
      
      
    <div>
      {fileUrl && (
        <div className={Style.voterInfo}>

       
        <div className={Style.voterInfo_paragraph}>

        <p>
        Name: <span> {formInput.name}</span>
        </p>
        <p>
        Add: <span> {formInput.address.slice(0 , 20)}</span>
        </p>
          <p>
        Pos: <span> {formInput.position}</span>
          </p>
        </div>
        
        </div>
      )}


       {!fileUrl && (

        <div className={Style.sideInfo}>

          <div className={Style.sideInfo_box}>
          <h4>Add a Voter </h4>

          <p>Blockchain Voting</p>

          <p className={Style.sideInfo_para}>Voter</p>

          </div>

          <div className={Style.card}>
            {voterArray.map((el, i)=>(
              <div  className={Style.card_box}>
                <div className={Style.image}>

                  <img src = '' alt = "Profile Photo"/>
                </div>

                <div className={Style.card_info}>

                <p>
                {el[1]}
                </p>

                <p>
                {el[2]}
                </p>
                <p>
                
                </p>

                </div>

              </div>


            )) }


          </div>

        </div>


       )}



    </div>

    <div className={Style.voter}>

<div className ={Style.voter_container}>

  <h1>Create New Voter</h1>
  

</div>
<div className={Style.input_container}>
 <Input inputType = "text" title = "Name" placeholder = "Voter Name" handleClick={(e) => setFormInput({...formInput, name : e.target.value})}/> 
 <p>{error2}</p>
 <Input inputType = "text" title = "Address"  defaultValue = "imi ka" handleClick={(e) => setFormInput({...formInput, address : e.target.value})}/> 
 <Input inputType = "text" pattern="[0-9]+-[A-Za-z0-9]+" minlength="13" title = "National ID" placeholder = "Voter National ID" handleClick={(e) => setFormInput({...formInput, nationalId : e.target.value})}/> 

             
 <p>{error}</p>
<div className={Style.Button}>
  <Button btnName = "Authorized Voter" handleClick={()=> createVoter(formInput, router)}/>

</div>
</div>


















</div>

<div className={Style.createdVoter}>
 <div className={Style.createdVoter_info}>
  <p>Notice For User</p>
  <p>Organizer <span>{organizerAddress.slice(0,10)}</span></p>


 </div>

</div>


    </div>



  

);

       };


export default allowdVoters;