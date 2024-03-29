import React, {useState, useEffect} from 'react';
import Web3modal from 'web3modal';
import {ethers} from 'ethers';
import {create as ipfsHttpClient} from "ipfs-http-client";
import axios from "axios";
import {useRouter} from "next/router";
import {VotingAddress, VotingAddressABI} from "./constant";



const projectId = '2GVKTo27xkr4HFAXtQ6196j9dy9';
const projectSecret = '6f386e194e3d38d646525f9aefdc5e1b';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);


export const VotingContext =  React.createContext();
export const VotingProvider = ({children}) => {
   

    const votingTitle = 'My first smart contract app';
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex = [];
    const pushVoter = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate);
    const [error, seterr] = useState('');
    const [error2, seterr2] = useState('');
    const highestVote = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);
    const [organizerAddress, setOrganizerAddress] = useState('');
    const [currentStatus, setStatus] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [shortStartingDate, setshortStartingDate] = useState('');
    const [shortEndingDate, setshortEndingDate] = useState('');
    const [disabled, setDisabled] = useState('');
    const [voterStatus, setvoterStatus] = useState('');
   
    const checkIfWalletIsConnected = async()=>{
        if (!window.ethereum) return setError("Please install MetaMask");
        const account = await window.ethereum.request({method: "eth_accounts"});

        if(account.length){
            setCurrentAccount(account[0]);
        
        }else{
            console.log("Please Install Metamask, Connect and Reload");

        }

    };


    
    const connectWallet = async ()=>{
        if(!window.ethereum) return seterr("Please Install Metamask");
        const account = await window.ethereum.request({method: "eth_requestAccounts",});
        setCurrentAccount(account[0]);
    }

    const uploadToIPFS = async(file) =>{
        try{
            const added = await client.add({content:file});
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return url;

        }catch(error){
            



            setError("Error Uploading File to IPFS");

        }
    }

    const period = async (n , s, e)=>{

  
      
        await axios.post("http://localhost:3002/resetParameters").then(response => {
      
            //console.log(response);
            //console.log(response.data);   
        });
    
       
            const data = {"name" : n, "start" : s, "end" : e};
           

           await axios.post("http://localhost:3002/addParameters", data).then(response => {
      
              //console.log(response);
              //console.log(response.data);   
          });
      
        seterr2("Refresh the page");
        router.push("/");




       // console.log(startDate);
       // setStartDate(startDate);
     
    }
    

    const getPeriod = async ()=>{
        var startDict = {};
        var EndDict = {};
        var temp;
       
        await axios.get("http://localhost:3002/getParameters").then(response => {
            var Rdata = response.data;
            
            Rdata.map((data, key) =>{
    
            startDict[data.name] = data.start;
            EndDict[data.name] = data.end;
    
          // console.log("Start Voting : " + startDict.voting, "End Voting :" + EndDict.voting);
           
            });
    
    
          
//console.log(startDict.voting)   
            temp = [startDict, EndDict];
            
            
    });

    var sd = new Date(temp[0].voting);
    var ed  = new Date(temp[1].voting);

    sd = sd.toLocaleDateString();
    ed = ed.toLocaleDateString();

    
            setStartingDate(temp[0].voting);
            setEndingDate(temp[1].voting);
            setshortStartingDate(sd);
            setshortEndingDate(ed);
   // console.log(temp[0].voting);
   // return temp;
    //setVotingPeriod(temp);
    
    
    }

    const getDisabledStats = async (sd, ed)=>{
       const today = new Date();
       var sd = new Date(sd);
       var ed  = new Date(ed);
       
        //console.log(ssd);
       
        if ((sd < today)&&(ed > today) ){
           setDisabled(false);
           seterr("");
        }else{
            setDisabled(true);
            seterr("Voting is disabled");
        }

      

    }
    


    const createVoter = async(formInput, router)=>{


        var stat = false;
        const regex2 = "[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}";
       
        const regex = "[0-9]+-[A-Za-z0-9]+";
      try{

            const {name ,address, nationalId} = formInput;

            

        voterArray.map((el) =>(
            (el[2] === nationalId)&&(
                
            stat = true
           
            )
            


        ))
        //console.log(stat);
            
           // console.log(exists);
            //console.log(name, address, position);
            
            if(!name || !address || !nationalId){
                return console.log("Input Data is Missing")
            } else if(!name.match(regex2)){



                seterr2("Enter full name");
            }else if (nationalId.match(regex) && (nationalId.length == 13)&&(stat == false) ){
            
            const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)
            //console.log(contract);
            //const data = JSON.stringify({name, nationalId, address});
            //const added =  await client.add(data);
            //const url = `https://ipfs.infura.io./ipfs/${added.path}`;
            const voter = await contract.voterRight(address, name, nationalId );
            voter.wait();
            //console.log(voter);
            router.push("voterList")
            
            }else if (nationalId.match(regex) && (nationalId.length == 13)&&(stat == true) ){

                console.log("A user with the same ID number already exists");
                seterr("A user with the same ID number already exists");
            

            }else{
                console.log("National ID should 13 Characters long & should be of the form 00-0000000X00");
                seterr("National ID should be 13 Characters long & should be of the form 00-0000000X00");
            }

        }catch(error){
            seterr(error);
        }
     
        stat = false;
    }
    

    const getAllVoterData = async () => {

        try {
            
        const web3modal = new Web3modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer)

       const voterListData = await contract.getVoterList();
        setVoterAddress(voterListData);
        //console.log(voterListData);
        voterListData.map(async (el) => {
           const singleVoterData = await contract.getVoterdata(el);
          pushVoter.push(singleVoterData);
           // console.log(singleVoterData);

        } );



        const voterList = await contract.getVoterLength();
        //console.log(voterList.toNumber());
        setVoterLength(voterList.toNumber());



        } catch (error) {
            console.log(error);
        }


    };

    const giveVote = async(id) =>{
        try {
            const voterAddress = id.address;
            const voterId = id.id;
            const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)
            const votedList = await contract.vote(voterAddress, voterId );
            votedList.wait();
            //console.log(votedList);
            router.push("/");
            
        } catch (error) {
            //seterr("You Already Voted");
        }
    }


    const setCandidate = async(candidateForm,imgUrl, router)=>{

        const regex2 = "[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}";
        var candidatestat = false;
        const {name , address, position} = candidateForm;

        candidateArray.map((el) =>(
            (el[5] === address)&&(
                
            candidatestat = true
           
            )
            


        ))

        try{

            
            //console.log(name, address, position);
            if(!name || !address || !position){
                return console.log("Input Data is Missing")
            }else if(candidatestat == true){
                console.log("Candidate already exists");

                seterr(("This Candidate already exists"))
            }else if(!name.match(regex2)){


                seterr2(("Enter Full Name and Surname"));

            }else{
                const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)
            //console.log(contract);
            //const data = JSON.stringify({name, address, age});
            //const added =  await client.add(data);
            //const url = `https://ipfs.infura.io./ipfs/${added.path}`;
            const candidate = await contract.setCandidate(address, position, name, imgUrl );
            candidate.wait();
            console.log(candidate);
            router.push("/");
            }

            //console.log(name , age, address);
            //


        }catch(error){
            console.log(error);
        }
    }

    const getNewCandidate = async() => {

        try {
            const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)
           //console.log(contract);
            const allCandidates = await contract.getCandidate();

            allCandidates.map(async(el)=> {
                const singleCandidateData = await contract.getCandidatedata(el);
                pushCandidate.push(singleCandidateData);
                candidateIndex.push(singleCandidateData[2].toNumber());
            })



            const allCandidateLength = await contract.getCandidateLength();
            setCandidateLength(allCandidateLength.toNumber());
            allCandidateLength.wait();
            
        } catch (error) {
            
        }

    }

    const getOrganizer = async() =>{

        try {
            const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)
           //console.log(contract);
            const organizer = await contract.getOrganizer();
            setOrganizerAddress(organizer);
            //console.log(organizer);
            
        }catch(error){

            console.log(error);

            }
        
    }


    const accountStatus = async () =>{
        getAllVoterData();
      
        connectWallet();
        
           
            
            //console.log("yes");
            
            
       

      
        
       
         
    }

 
   




    useEffect( () =>{
        getAllVoterData();
        getNewCandidate();
        getOrganizer();
      
        checkIfWalletIsConnected();
        getPeriod();
        accountStatus();  
        //console.log(voterStatus);
      //console.log(startingDate);
   
       }, []);
    

    return(
        <VotingContext.Provider value ={{getDisabledStats, disabled,getPeriod,votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter, setCandidate, giveVote, getNewCandidate, getAllVoterData, voterArray, voterLength, period, voterAddress, currentAccount, candidateLength, candidateArray, organizerAddress, currentStatus,  error, error2,startingDate, endingDate, shortEndingDate, shortStartingDate, voterStatus}}>
            {children}
        </VotingContext.Provider>
    )
}




