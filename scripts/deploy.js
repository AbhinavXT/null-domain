const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy('life');
	await domainContract.deployed();
  
	console.log('Contract deployed to:', domainContract.address);
  
	let txn = await domainContract.register('immortal', {
	  	value: hre.ethers.utils.parseEther('0.1'),
	});

	await txn.wait();
	console.log('Minted domain immortal.life');
  
	txn = await domainContract.setRecord(
	  'immortal',
	  'I am immortal'
	);
	await txn.wait();
	console.log('Set record for immortal.');
  
	const address = await domainContract.getAddress('immortal');
	console.log('Owner of domain immortal:', address);
  
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