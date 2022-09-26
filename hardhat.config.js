require("@nomiclabs/hardhat-waffle")

require("dotenv").config()

const ALCHEMY_MUMBAI_URL =
	process.env.ALCHEMY_MUMBAI_URL ||
	"https://polygon-mumbai.g.alchemy.com/v2/your-api-key"

module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.8.10",
			},
			{
				version: "^0.6.6",
			},
		],
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			url: ALCHEMY_MUMBAI_URL,
			accounts:
				process.env.ACCOUNT_KEY !== undefined
					? [process.env.ACCOUNT_KEY]
					: [],
			timeout: 1000000,
		},
	},
}
