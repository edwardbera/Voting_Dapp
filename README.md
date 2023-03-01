**Ethereum Voting Application**

#PREREQUISITES
- Nodejs 16.0 or greater( download : https://nodejs.org/en/download/)

#INSTALLATION
- Extract the ‘EthVotinApp’ folder into any directory on your computer.
- Open the folder in your terminal and run “nom install” , to install the core dependencies for your OS.
- Follow the following instruction ton install and setup the hardhat environment : https://hardhat.org/tutorial/creating-a-new-hardhat-project.
- Run ‘npx hardhat node’ to start the hardhat ethereal development environment.
- Deploy the smart constract by running : ‘npx hardhat run scripts/deploy.js --network localhost’.
- Open the ‘EthVotingApp/MongoDB Server/‘ folder in your terminal and run ‘node index.js’ to start the MongoDB server.
- Go back the the root folder ‘EthVotingApp’.
- Run ‘npm run dev’ to start the webserver.
- Open your browser an enter the address ‘localhost:3000’

#CONNECTING METAMASK TO THE HARDHAT NETWORK
1. On metamask, Go to settings/Networks.
2. Click on add networks.
3. Click on Add manually.
4. Enter the network credentials as in the setup.
Default configurations are : 
New RPC URL - http://127.0.0.1:8545/
Chain ID : 1337
Currency Symbol : ETH

- Import the demo accounts into your metamask wallet.

NB : Account 0 is the organiser.
