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
    const highestVote = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);
    const [organizerAddress, setOrganizerAddress] = useState('');
    const [currentStatus, setStatus] = useState('');
    const [RegVoter, setRegVoter] = useState(false);
    const [isNewUser, setNewUser] = useState(false);
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

    const createVoter = async(formInput, router)=>{

        const regex = "[0-9]+-[A-Za-z0-9]+";
        try{

            const {name ,address, nationalId} = formInput;
            //console.log(name, address, position);
            if(!name || !address || !nationalId){
                return console.log("Input Data is Missing")
            }else if (nationalId.match(regex) && (nationalId.length == 13) ){
            
           
            
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
            
            }else{
                console.log("National ID should 13 Characters long & should be of the form 00-0000000X00");
                seterr("National ID should be 13 Characters long & should be of the form 00-0000000X00");
            }

        }catch(error){
            seterr(error);
        }
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
            seterr(error);
        }
    }


    const setCandidate = async(candidateForm,imgUrl, router)=>{
        try{

            const {name , address, position} = candidateForm;
            //console.log(name, address, position);
            if(!name || !address || !position){
                return console.log("Input Data is Missing")
            }

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
            //console.log(name , age, address);
            //router.push("/")


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


    const accountStatus = async =>{
        checkIfWalletIsConnected();
        getAllVoterData();

        voterArray.map((el, id) =>{
            console.log(el[3]);
            if(el[3].toUpperCase() == currentAccount.toUpperCase()){
                console.log("voter");
              return setStatus(true);
            }
            
          })

         
    }

    const isNew = () =>{
        checkIfWalletIsConnected();

        getOrganizer();
        if ((RegVoter == false) & (currentAccount.toUpperCase() != organizerAddress.toUpperCase())){

            setNewUser(true)

            router.push("allowd-voters")
            
        }

        
    };
    const isVoter = () => {
        getAllVoterData();
        voterArray.map((el) =>(

            (currentAccount.toUpperCase() === el[3].toUpperCase())&&(

                setRegVoter(true)
                
            )
                

        ))

        
    };




    useEffect( () =>{
        getAllVoterData();
        getNewCandidate();
        getOrganizer();
        accountStatus();
        checkIfWalletIsConnected();
        isNew();
        isVoter();
        console.log(RegVoter);

        console.log(currentStatus);
       }, []);
    

    return(
        <VotingContext.Provider value ={{votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter, setCandidate, giveVote, getNewCandidate, voterArray, voterLength, voterAddress, currentAccount, candidateLength, candidateArray, organizerAddress, currentStatus, RegVoter, isNewUser,  error}}>
            {children}
        </VotingContext.Provider>
    )
}




