import React, {useState, useEffect, useContext} from 'react';
//import Image from 'next/image';
import Countdown from "react-countdown";

import {VotingContext} from '../context/voter.js';
import Style from '../styles/index.module.css';
import Card from "../components/Card/Card";
import NavBar from "../components/NavBar/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useRouter} from "next/router";
import Link from 'next/link';
//import image from "../assets/candidate-1.jpg";


const index = () => {
const {disabled, error2, getPeriod, shortEndingDate, shortStartingDate, startingDate, endingDate, getNewCandidate, candidateLength, candidateArray, voterLength, giveVote, checkIfWalletIsConnected , currentAccount, organizerAddress, voterArray, currentStatus, period, error, voterStatus} = useContext(VotingContext);
const router = useRouter();
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
 


  return ( <div className={Style.home}>

      { currentAccount.toUpperCase() === organizerAddress.toUpperCase() &&(

        <div className={Style.winner}>
         
          <div className={Style.winner_info}>

          <div className={Style.candidate_list}>
            <p>
              No Candidate : <span>{candidateLength}</span>
            </p>
            </div>
            <div className={Style.candidate_list}>

              
            <p>
              No Voter : <span>{voterLength}</span>
            </p>
            </div>
            </div>
            
            <div className={Style.winner_message}>
            <div>
              <h2>Voting</h2>
              
              <br/>
<p>Start Date</p>
<DatePicker title ="Start Date" selected={startDate} onChange={(date) => setStartDate(date)} />
<p>End Date</p>

<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
<p className= {Style.Card_error}>{error2}</p>
<button onClick={()=> period("voting", startDate, endDate)}>Set Dates</button>

</div>
<div>
 
            <p>
            Start :  {shortStartingDate} 
            </p>
            <p>
           End : {shortEndingDate} 
            </p>

            <br></br>
            
 
            </div>
          
            </div>

            
          
        </div>
  
        
      )}


{ ! (currentAccount.toUpperCase() === organizerAddress.toUpperCase()) &&(


  
        <div className={Style.winner}>

     

          <div className={Style.winner_info}>

          <div className={Style.candidate_list}>
            <p>
              No Candidate : <span>{candidateLength}</span>
            </p>
           
           
            </div>
            <div className={Style.candidate_list}>
            <p>{voterArray.map((el) =>(
              <p>
              {el[5] === true ? "You have already Voted" : "Not Voted"}

            </p>
            ))}</p>
            </div>
            </div>
            <div className={Style.winner_message}>
            <p>
            Start :  {shortStartingDate} 
            </p>
            <p>
           End : {shortEndingDate} 
            </p>



            </div>

            

        </div>
      )}


        

      <Card disabled = {disabled}  giveVote = {giveVote}/> 

    </div>

  )
  
};

export default index;