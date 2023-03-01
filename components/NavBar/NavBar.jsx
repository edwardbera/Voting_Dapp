import { useContext, useEffect, useState } from "react";
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import {AiFillLock, AiFillUnlock} from 'react-icons/ai';


import { VotingContext } from "../../context/voter";
import Style from './NavBar.module.css';
import loading from '../../assets/loading.gif';
import Router from "next/router";
import {useRouter} from "next/router";

const NavBar   = () => {
    const router = useRouter();
    const { connectWallet, currentAccount, organizerAddress,  getAllVoterData, checkIfWalletIsConnected, error, voterArray} = useContext(VotingContext);
    const [openNav, setOpenNav] = useState(true);
    const [RegVoter, setRegVoter] = useState(false);
    const [isNewUser, setNewUser] = useState(false);

    const openNavigation = () => {
        if (openNav){
            setOpenNav(false)
        }else if(!openNav){
            setOpenNav(true)
        }
    }

    const isNew = () =>{
       
        if ((RegVoter === false) && (currentAccount.toUpperCase() !== organizerAddress.toUpperCase())){

            

            Router.push("allowd-voters")
            
        }

        
    }


   
    

 

  

    return (
    
    
    
    
    <div className={Style.NavBar}>
       

{( currentAccount.toUpperCase() === organizerAddress.toUpperCase()) &&(
 

        <div className={Style.navbar_box}>


        <div className={Style.title}>

        <Link href={{pathname : '/'}}>
            <Image src={loading} alt="logo" width={80} height={80}/>
        </Link>

        

        </div>
        <h1>Organizer</h1>
        <div className={Style.connect}>
        {currentAccount ? (

            <div>
                <div className={Style.connect_flex}>
                    <button onClick ={() => openNavigation()}>
                        {currentAccount.slice(0,10)}
                    </button>
                    {currentAccount && (
                        <span>{openNav ? (<AiFillUnlock onClick={()=> openNavigation()}/> 
                        ):(
                            <AiFillLock onClick={()=> openNavigation()}/>
                        )}</span>
                    )}
                </div>
                {openNav && (
                    <div className={Style.navigation}>
                        <p>
                            <Link href={{pathname : "/"}}>Home</Link>
                        </p>
                        <p>
                            <Link href={{pathname : "candidateRegistration"}}>Candidate Registration</Link>
                        </p>
                        <p>
                            <Link href={{pathname : "allowd-voters"}}>Voter Registration</Link>
                        </p>
                        <p>
                            <Link href={{pathname : "voterList"}}>Voter List</Link>
                        </p>
                    </div>
                )}
            </div>
        ) : (
            <button onClick={()=> connectWallet()}> Connect Wallet</button>
        )

        }

        </div>
        </div>
)

}

{( currentAccount.toUpperCase() != organizerAddress.toUpperCase()) &&(
         
  
 
             <div className={Style.navbar_box}>
            
            
             <div className={Style.title}>
             
             <Link href={{pathname : '/'}}>
                 <Image src={loading} alt="logo" width={80} height={80}/>
                 
             </Link>
            
            
            
             </div>
             <h1> Voter</h1>
             
          

             
             
            
             <div className={Style.connect}>
             {currentAccount ? (
            
                 <div>
                     <div className={Style.connect_flex}>
                         <button onClick ={() => openNavigation()}>
                             {currentAccount.slice(0,10)}
                         </button>
                         {currentAccount && (
                             <span>{openNav ? (<AiFillUnlock onClick={()=> openNavigation()}/> 
                             ):(
                                 <AiFillLock onClick={()=> openNavigation()}/>
                             )}</span>
                         )}
                     </div>
                     {openNav && (
                         <div className={Style.navigation}>
                             <p>
                                 <Link href={{pathname : "/"}}>Home</Link>
                             </p>
                             <p>
                            <Link href={{pathname : "allowd-voters"}}>Voter Registration</Link>
                        </p>
                         </div>
                     )}
                 </div>
             ) : (
                 <button onClick={()=> connectWallet()}> Connect Wallet</button>
             )
            
             }
            
             </div>
             </div>
            
 
 
 
 
 
 
 
            
 
          
 
        )
           
    
       
 
 
 
 
 
       
 }







        

      

    
       

   





   


    </div>)

}



export default NavBar;