import Image from 'next/image'

import { useState, useEffect } from "react"
import { networks } from '../utils/networks'

const Header = () => {
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

    // Calls Metamask to connect wallet on clicking Connect Wallet button
    const connectWallet = async () => {
        try {
            const { ethereum } = window

            if (!ethereum) {
                console.log('Metamask not detected')
                return
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            console.log('Found account', accounts[0])
            setCurrentAccount(accounts[0])
            switchNetwork()
        } catch (error) {
        console.log('Error connecting to metamask', error)
        }
    }

    const switchNetwork = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
            })} catch (error) {
                    if (error.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: '0x13881',
                                    chainName: 'Mumbai',
                                    rpcUrls: [
                                        process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL,
                                    ],
                                    nativeCurrency: {
                                        name: 'Matic',
                                        symbol: 'MATIC',
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                                }],
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    console.log(error)
                }
        } else {
            // If window.ethereum is not found then MetaMask is not installed
            alert(
                'MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html'
            )
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()

        if (currentAccount !== '' && network === 'Polygon Mumbai Testnet') {
            console.log('init')
        }
    }, [currentAccount, network])

    return (
        <header className="flex justify-between items-center px-32 pt-8">
            <div className="flex gap-x-8 text-3xl font-bold">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                    </svg>
                </div>

                <div>Life Naming Serive</div>
            </div>
            
            {currentAccount === '' ? (
                <button 
                    className="px-12 py-2 border-2 border-purple-400 rounded font-bold"
                    onClick={connectWallet}    
                >
                    Connect Wallet
                </button>
            ) : (
                <button 
                    className="flex px-8 py-2 border-2 border-purple-400 rounded font-bold gap-x-4"    
                >
                    <Image 
                        src="/polygon.svg"
                        alt="Picture of polygon logo"
                        width={22}
                        height={22}
                    />

                    <div>
                        Connected{' '}
                        <span>{currentAccount.slice(0,10)}...</span>
                    </div>
                </button>
            )}
            
        </header>
    ) 
}

export default Header