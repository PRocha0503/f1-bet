require("dotenv").config({ path: "../.env" });

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const mnemonicPhrase = process.env.WALLET_MNEMONIC;
const network = process.env.INFURA_ENDPOINT;
const provider = new HDWalletProvider(mnemonicPhrase, network);
const web3 = new Web3(provider);

const compiledFormula = require("./build/FormulaBet.json");
const abi = compiledFormula.abi;
const bytecode = compiledFormula.evm.bytecode.object;
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account", accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({
			data: "0x" + bytecode,
			arguments: [2],
		})
		.send({
			from: accounts[0],
		})
		.catch((err) => console.log(err));

	console.log("Contract deployed to", result.options.address);
	provider.engine.stop();
};

deploy();
