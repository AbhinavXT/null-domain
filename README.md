# Life Domain - Domain Naming Service on Polygon

## Table of Contents:
  - [Deployed Website url](#deployed-website-url)
  - [Project Description](#project-description)
  - [Clone, Install and Build steps](#clone-install-and-build-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning and installing dependencies](#cloning-and-installing-dependencies)
    - [Running the frontend](#running-the-frontend)
    - [Deploying and running against a local instance](#deploying-and-running-against-a-local-instance)
    - [Environment variables (not needed for running project locally)](#environment-variables-not-needed-for-running-project-locally)

## Deployed Website url

https://domain-client.vercel.app/

## Project Description

Domain Name Service build on Polygon using Solidity, Hardhat, Next.js and ethers.js

## Clone, Install and Build steps

### Prerequisites

1. [Git](https://git-scm.com/)
2. [Node JS](https://nodejs.org/en/) (everything was installed and tested under v15.12.0)
3. A Browser with the [MetaMask extension](https://metamask.io/) installed.
4. Test Ether on the Rinkeby network.

<br>

### Cloning and installing dependencies

1. Clone the project repository on your local machine

```
 git clone https://github.com/AbhinavXT/life-domain.git

 cd life-domain
```

2. Installing dependencies

-   For contracts -
    ```
    npm install
    ```
-   For client -
    ```
    cd client
    npm install
    ```

### Running the frontend

For running frontend locally run command:

```
cd client
npm run dev
```

### Deploying and running against a local instance

1. For deploying and running the dApp against a local instance run commands:

```
npx hardhat node
```

2. This should create a local network with 19 accounts. Keep it running, and in another terminal run:

```
npx hardhat run scripts/deploy.js --network localhost
```

3. When the deployment is complete, the CLI should print out the addresses of the contracts that were deployed:

```
contractAddress = "Contract Address"
```

1. Copy these addresses and paste them in the [**config.js**](https://github.com/AbhinavXT/life-domain.git/blob/main/client/config.js) file inside the client floder, in place of current addresses.

```
export const contractAddress = "Contract Address"
```

5. For importing account to metamask

    1. Import account using private key from one of the accounts that were logged on running `npx hardhat node`
    2. Create a custom network (if not already there) pointing to http://127.0.0.1:8545 with **chainId 1337**
    3. Switch to this network and connect it to the dApp and reload it.
    4. For better testing of the transfer of tokens and transactions import at least 2 accounts\*\_

6. Now run the frontend locally in another terminal using command:

```
cd client
npm run dev
```

After this you can run and test the dApp locally in your web browser.

### Environment variables 

```
// in root folder
ALCHEMY_MUMBAI_URL =
ACCOUNT_KEY =

// inside client folder
NEXT_PUBLIC_ALCHEMY_MUMBAI_URL =  
```
