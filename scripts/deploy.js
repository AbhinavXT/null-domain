const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy('life');
	await domainContract.deployed();
  
	console.log('Contract deployed to:', domainContract.address);
  
	let txn = await domainContract.register('working', {
	  value: hre.ethers.utils.parseEther('0.1'),
	});

	await txn.wait();
	console.log('Minted domain immortal.life');
  
	txn = await domainContract.setRecord(
	  'working',
	  'this is the first nft minted'
	);
	await txn.wait();
	console.log('Set record for working.');
  
	const address = await domainContract.getAddress('working');
	console.log('Owner of domain working:', address);
  
	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(balance));
  };
  
const runMain = async () => {
	try {
	  	await main();
	  	process.exit(0);
	} catch (error) {
	  	console.log(error);
	  	process.exit(1);
	}
};
  
  runMain();