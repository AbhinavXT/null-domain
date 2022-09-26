import Head from 'next/head'
import { useState, useCallback } from 'react';

import { contractAddress } from '../config'
import Domain from '../utils/Domains.json'

import { ethers } from 'ethers'

import DomainList from '../components/DomainList'

const Home = () => {
  const [domain, setDomain] = useState('');
  const [record, setRecord] = useState('');

  const onDomainChange = useCallback(
    (e) => {
      setDomain(e.target.value.toLowerCase())
    },
    [domain]
  )

  const onRecordChange = useCallback(
    (e) => {
      setRecord(e.target.value)
    },
    [record]
  )

  const mintDomain = async () => {
    console.log(domain)
    // Don't run if the domain is empty
    if (!domain) { return }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert('Domain must be at least 3 characters long');
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)	
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1';
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        console.log(contractAddress);
        console.log(Domain.abi);
        const contract = new ethers.Contract(contractAddress, Domain.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        let tx = await contract.register(domain, {value: ethers.utils.parseEther(price)});
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
  
        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);
          
          // Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();
  
          console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
          
          setRecord('');
          setDomain('');
        }
        else {
          alert("Transaction failed! Please try again");
        }
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col py-2">
      <Head>
        <title>Life Domain Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col px-20 text-center">
        <div className='text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50 pb-6'>Mint Your Domain</div>
        
        <div className='text-xl font-bold pb-8'>Your immortal identity on the blockchain</div>
        
        <div className='flex flex-col justify-center items-center gap-y-8'>
          <div className='flex'>
            <input 
              type="text" 
              placeholder='Enter your domain' 
              className='px-8 py-2 w-80 bg-gray-800 rounded-l-md focus:outline-none font-bold'
              onChange={onDomainChange}
            />
            <span className='font-bold px-4 py-2 bg-gray-800 w-16 rounded-r-md'>.life</span>
          </div>

          <input 
            type="text" 
            placeholder='Enter record' 
            className='px-8 py-2 bg-gray-800 rounded-md w-96 focus:outline-none font-bold'
            onChange = {onRecordChange}
          />

          <button 
            className="px-12 py-2 border-2 border-purple-400 rounded font-bold mb-32"
            onClick={mintDomain}  
          >
            Mint Domain
          </button>
        </div>
        
        <DomainList />
      </main>
    </div>
  )
}

export default Home
