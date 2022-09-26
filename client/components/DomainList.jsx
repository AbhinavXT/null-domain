import React from 'react'
import { useState, useEffect } from 'react'

import { ethers } from 'ethers'

import { contractAddress } from '../config'
import Domain from '../utils/Domains.json'
import { networks } from '../utils/networks'

const DomainList = () => {
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mints, setMints] = useState([]);
    const [currentAccount, setCurrentAccount] = useState('')
    const [network, setNetwork] = useState('')

    // Checks if wallet is connected to the correct network
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window

        if (!ethereum) {
            console.log('Make sure you have metamask!')
            return
        } else {
            console.log('We have the ethereum object', ethereum)
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if (accounts.length !== 0) {
            const account = accounts[0]
            console.log('Found an authorized account:', account)
            setCurrentAccount(account)
        } else {
            console.log('No authorized account found')
        }

        // This is the new part, we check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        setNetwork(networks[chainId])

        ethereum.on('chainChanged', handleChainChanged)

        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
            window.location.reload()
        }
    }

    // Add this function anywhere in your component (maybe after the mint function)
    const fetchMints = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // You know all this
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, Domain.abi, signer);

                // Get all the domain names from our contract
                const names = await contract.getAllNames();

                // For each name, get the record and the address
                const mintRecords = await Promise.all(names.map(async (name) => {
                const mintRecord = await contract.records(name);
                const owner = await contract.domains(name);
                return {
                    id: names.indexOf(name),
                    name: name,
                    record: mintRecord,
                    owner: owner,
                };
            }));

            console.log("MINTS FETCHED ", mintRecords);
            setMints(mintRecords);
            }
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()

        if (currentAccount !== '' && network === 'Polygon Mumbai Testnet') {
            fetchMints()
        }
    }, [currentAccount, network])

    if (currentAccount && mints.length > 0) {
        return (
            <div className='flex flex-col gap-y-8'>
                <div className='font-bold text-xl'>Recently minted domains!</div>
                <div className="flex gap-x-8 justify-center items-center">
                    { mints.map((mint, index) => {
                      return (
                        <a
                            href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${mint.id}`}
                            className='flex justify-center items-center px-8 py-2 border-2 border-pink-300 rounded font-bold cursor-pointer'
                            key={index}
                        >
                            {mint.name}.life
                        </a>
                      )
                    })}
                </div>
            </div>
        );
    }

}
export default DomainList