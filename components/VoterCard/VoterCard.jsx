import React from "react";
import Image from "next/image";


import VoterCardStyle from "./VoterCard.module.css";
import Style from "../Card/Card.module.css";


const VoterCard = ({voterArray}) => {

    return (

        <div className={Style.card}>
            {voterArray.map((el, id) =>(
                <div className={Style.Card_box}>
                    <div className={Style.image}>
</div>


<div className={Style.Card_info}>

    <h2>
        {el[1]}
    </h2>

    <p>National ID : {el[2]} </p>
    <p>Address : {el[3]} </p>
    
                <p className={VoterCardStyle.vote_Status}>
                    {el[5] === true ? "You Already Voted" : "Not Voted"}
                </p>
                
                    
</div>
                </div>
            ))}

        </div>
    )
}

export default VoterCard;