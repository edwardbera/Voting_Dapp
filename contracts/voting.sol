//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

//Create Contract
contract Create{
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;
   

    struct Candidate{
        uint candidateId;
        string position;
        string name;
        string image;
        uint voteCount;
        address _address;
        
    }

    event CandidateCreate(
        uint indexed candidateId,
        string position,
        string name,
        string image,
        uint voteCount,
        address _address
    );

    address[] public candidateAddress;
    

    mapping(address => Candidate) public candidates;

    address[] public votedVoters;
    address[] public votersAddress;
     

    mapping(address => Voter) public voters;

    struct Voter {
        uint voter_voterId;
        string voter_name;
        string voter_NationalId;
        address voter_address;
        uint voter_allowed;
        bool voter_voted;
        uint voter_vote;
           }  


        event VoterCreated(
        uint indexed voter_voterId,
        string voter_name,
        string voter_NationalId,
        address voter_address,
        uint voter_allowed,
        bool voter_voted,
        uint voter_vote
        
        ); 

        constructor(){
           votingOrganizer = msg.sender; 
        }

        function getOrganizer() public view returns (address){
            return votingOrganizer;
        }

        function setCandidate(address _address, string memory _position, string memory _name , string memory _image ) public {
           require(votingOrganizer == msg.sender, "Only organizer can create the Candidates");
            _candidateId.increment();
            uint256 idNumber = _candidateId.current();

            Candidate storage candidate = candidates[_address];
            candidate.position = _position;
            candidate.name = _name;
            candidate.candidateId = idNumber;
            candidate.image = _image;
            candidate.voteCount = 0;
            candidate._address = _address;
            

            candidateAddress.push(_address);

            emit CandidateCreate(idNumber, _position, _name,_image, candidate.voteCount, _address);
            

        }

        function getCandidate() public view returns (address[] memory){
            return candidateAddress;
        }

        function getCandidateLength() public view returns (uint){
            return candidateAddress.length;
        }
         function getCandidatedata(address _address) public view returns(string memory, string memory, uint, string memory, uint, address){
            return (
                candidates[_address].position,
                candidates[_address].name,
                candidates[_address].candidateId,
                candidates[_address].image,
                candidates[_address].voteCount,
                candidates[_address]._address
            );
         }


    function voterRight(address _address, string memory _name, string memory _nationalId)public {
        _voterId.increment();

        uint idNumber = _voterId.current();
        Voter storage voter = voters[_address];

        require(voter.voter_allowed ==0);
        

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_NationalId = _nationalId;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
       


        votersAddress.push(_address);

        emit VoterCreated(idNumber, _name, _nationalId,_address, voter.voter_allowed , voter.voter_voted, voter.voter_vote);

    }

    

    function vote(address _candidateAddress , uint _candidateVoteId) external{
        Voter storage voter = voters[msg.sender];
        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed !=0, "You have no right to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voteCount += voter.voter_allowed;
    }


    function getVoterLength() public view returns (uint){
        return votersAddress.length;
           }

    function getVoterdata(address _address) public view returns (uint , string memory,string memory,  address, uint, bool){
        return (
        voters[_address].voter_voterId,
        voters[_address].voter_name,
    voters[_address].voter_NationalId,
        voters[_address].voter_address,
    
        voters[_address].voter_allowed,
        voters[_address].voter_voted

        
        
        );

    }

    function getVotedVoterList() public view returns (address[] memory){
        return votedVoters;

    }

    function getVoterList() public view returns (address[] memory){
        return votersAddress;
    }


}


