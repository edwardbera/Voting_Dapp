import React, {useState, useEffect, useContext} from 'react';
import Style from "./Card.module.css";
import {VotingContext} from '../../context/voter.js';


const Card = () => {
const {disabled, getPeriod, startingDate, endingDate, getNewCandidate,getDisabledStats, candidateLength, candidateArray, voterLength, giveVote, checkIfWalletIsConnected , currentAccount, organizerAddress, voterArray, currentStatus, period, error} = useContext(VotingContext);
 const today = new Date();
 //console.log(startingDate);
 
 getDisabledStats(startingDate, endingDate);
//console.log(disabled);

    return( <div className={Style.Card}>

        {candidateArray.map((el , i)=>(

            <div className={Style.Card_box}>
                <div className={Style.image}>

                <img src={el[3]}/>

                </div>

                <div className={Style.Card_info}>
                    <h2>
                        {el[1]}
                    </h2>
                    <p>{el[5]}</p>
                    <p className={Style.total}> Total Vote</p>

                </div>
                <div className={Style.card_vote}>
                    <p> {el[4].toNumber()}</p>
                </div>

                <div className={Style.Card_button}>
                    <button disabled = {disabled} onClick={()=> giveVote({address: el[5],  id: el[2].toNumber()})}
                    >Give Vote</button>

                    <p className= {Style.Card_error}>{error}</p>
                </div>
            </div>
        ))}

    </div>
    )
};


export default Card;