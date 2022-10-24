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
    const [candidateLegnth, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex = [];
    const pushVoter = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate);
    const [err, seterr] = useState('');
    const highestVote = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);

    const checkIfWalletIsConnected = async()=>{
        if (!window.ethereum) return setError("Please install MetaMask");
        const account = await window.ethereum.request({method: "eth_accounts"});

        if(account.length){
            setCurrentAccount(account[0]);
        
        }else{
            setError("Please Install Metamask, Connect and Reload");

        }

    };

    const connectWallet = async ()=>{
        if(!window.ethereum) return setError("Please Install Metamask");
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
        try{

            const {name , address, position} = formInput;
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
            const data = JSON.stringify({name, address, position});
            const added =  await client.add(data);
            const url = `https://ipfs.infura.io./ipfs/${added.path}`;
            const voter = await contract.voterRight(address, name, name,url );
            voter.wait();
            console.log(voter);
            router.push("voterList")


        }catch(error){
            console.log(error);
        }
    }

    const getAllVoterData = async () => {
        const web3modal = new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer)

            const voterListData = await contract.getVoterList();
            setVoterAddress(voterListData);

            //console.log(voterAddress);

            voterListData.map(async (el) => {
                const singleVoterData = await contract.getVoterdata(el);
                pushCandidate.push(singleVoterData);
                console.log(singleVoterData);

            } );

            
            





    };

    useEffect(() =>{
        getAllVoterData();
        
    }, []);


    //console.log(voterAddress);
    //getAllVoterData();
    return(
        <VotingContext.Provider value ={{votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter}}>
            {children}
        </VotingContext.Provider>
    )
}




