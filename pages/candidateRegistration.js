import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useRouter} from 'next/router';
import {useDropzone} from "react-dropzone";
import image from "next/image";
//import images from "../assets";
import { VotingContext } from '../context/voter';
import Style from '../styles/allowedvoter.module.css';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const candidateRegistration = ()=>{
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    position: "",
  });


  const router = useRouter();
  const {uploadToIPFS, setCandidate, getNewCandidate, candidateArray, organizerAddress, error, error2} = useContext(VotingContext);

  const onDrop = useCallback(async(acceptedFil)=>{
    const url = await uploadToIPFS(acceptedFil[0]);
    url = url.replace("ipfs.infura.io", "infura-ipfs.io");
    setFileUrl(url);
    
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,

  });

  useEffect( () =>{

    getNewCandidate() 
   }, []);


   //console.log(fileUrl);

  
  return (
    <div className={Style.createVoter}>
      
    <div>
      {fileUrl && (
        <div className={Style.voterInfo}>

       <img src={fileUrl} />
        <div className={Style.voterInfo_paragraph}>

        <p>
        Name: <span> {candidateForm.name}</span>
        </p>
        <p>
        Add: <span> {candidateForm.address.slice(0 , 20)}</span>
        </p>
          <p>
        Position: <span> {candidateForm.position}</span>
          </p>
        </div>
        
        </div>
      )}


       {!fileUrl && (

        <div className={Style.sideInfo}>

          <div className={Style.sideInfo_box}>
          <h4>Create candidate for Voting </h4>

          <p>Blockchain Voting</p>

          <p className={Style.sideInfo_para}>Contract candidate</p>

          </div>

          <div className={Style.card}>
            {candidateArray.map((el, i)=>(
              <div  className={Style.card_box}>
                <div className={Style.image}>

                  <img src = '' alt = "Profile Photo"/>
                </div>

                <div className={Style.card_info}>

                <p>
                  Name
                </p>

                <p>
                  Address
                </p>
                <p>
                  Details
                </p>

                </div>

              </div>


           
            ))}
          </div>

        </div>


       )}



    </div>

    <div className={Style.voter}>

<div className ={Style.voter_container}>

  <h1>Create New Candidate</h1>
  <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
            <div {...getRootProps()}>
              <input {...getInputProps()}/>

              <div className={Style.voter_container_box_div_info}>
                <p>Upload File: JPG, PNG</p>

                <div className={Style.voter_container_box_div_image}>
                  
                </div>

                <p>Drag & Drop File</p>
                <p>or Browse Media on your device</p>


              </div>
            </div>
            </div>


  </div>
</div>
<div className={Style.input_container}>
 <Input inputType = "text" title = "Name" placeholder = "Candidate Name" handleClick={(e) => setCandidateForm({...candidateForm, name : e.target.value})}/> 
 <p>{error2}</p>
 <Input inputType = "text" title = "Address" placeholder = "Candidate Address" handleClick={(e) => setCandidateForm({...candidateForm, address : e.target.value})}/> 
 <Input inputType = "text" title = "Position" placeholder = "Candidate Position" handleClick={(e) => setCandidateForm({...candidateForm, position: e.target.value})}/> 
 <p>{error}</p>
<div className={Style.Button}>
  <Button btnName = "Add Candidate" handleClick={()=> setCandidate(candidateForm,fileUrl, router)}/>

</div>
</div>


















</div>

<div className={Style.createdVoter}>
 <div className={Style.createdVoter_info}>
  <p>Notice For User</p>
  <p>Organizer <span>0x939939</span></p>

  <p>Only the organizer can add a user</p>

 </div>

</div>


    </div>



  

);

       };


export default candidateRegistration;