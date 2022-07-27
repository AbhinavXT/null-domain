const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory("Domain")
	const domainContract = await domainContractFactory.deploy()
	await domainContract.deployed()

	console.log("domain contract deployed to: " + domainContract.address)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

runMain()
