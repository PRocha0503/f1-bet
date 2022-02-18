const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.join(__dirname, "contracts", "F1.sol");
const source = fs.readFileSync(contractPath, "utf8");
var input = {
	language: "Solidity",
	sources: {
		[contractPath]: {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

for (let contractName in output.contracts[contractPath]) {
	// console.log(
	// 	contractName +
	// 		": " +
	// 		ouStput.contracts[contractPath][contractName].evm.bytecode.object
	// );
	fs.outputJSONSync(
		path.resolve(buildPath, contractName + ".json"),
		output.contracts[contractPath][contractName]
	);
}
