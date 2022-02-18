const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledContract = require("../ethereum/build/FormulaBet.json");

let accounts;
let bet;

const constructorsPrediction = [
	"M",
	"R",
	"Mc",
	"F",
	"A",
	"As",
	"W",
	"H",
	"Al",
	"T",
];

const constructorsPrediction2 = [
	"R",
	"M",
	"Mc",
	"F",
	"A",
	"As",
	"W",
	"H",
	"T",
	"Al",
];
const constructorsPrediction3 = [
	"F",
	"Mc",
	"R",
	"M",
	"A",
	"As",
	"Al",
	"H",
	"T",
	"W",
];

const driverPrediction = [
	"L",
	"M",
	"B",
	"C",
	"R",
	"Le",
	"S",
	"A",
	"O",
	"R",
	"La",
	"V",
	"St",
	"Al",
	"La",
	"Ms",
	"N",
	"W",
	"G",
	"Ts",
];
const driverPrediction2 = [
	"M",
	"L",
	"B",
	"C",
	"R",
	"Le",
	"S",
	"A",
	"O",
	"R",
	"La",
	"V",
	"St",
	"Al",
	"La",
	"Ms",
	"N",
	"W",
	"G",
	"Ts",
];
const driverPrediction3 = [
	"L",
	"M",
	"B",
	"C",
	"R",
	"Le",
	"S",
	"A",
	"O",
	"R",
	"La",
	"V",
	"St",
	"Al",
	"La",
	"Ms",
	"Ts",
	"W",
	"N",
	"G",
];

const enterBet = async (account) => {
	await bet.methods.enterBet().send({
		value: "30000000000000000000",
		from: account,
		gas: 6721975,
		gasPrice: "20000000000",
	});
};
const enterCprediction = async (account, prediction) => {
	await bet.methods.predictConstructorsTable(prediction).send({
		from: account,
		gas: 6721975,
		gasPrice: "20000000000",
	});
};
const enterDprediction = async (account, prediction) => {
	await bet.methods.predictDriversTable(prediction).send({
		from: account,
		gas: 6721975,
		gasPrice: "20000000000",
	});
};
const enterChprediction = async (account, prediction) => {
	await bet.methods.predictChecoWins(prediction).send({
		from: account,
		gas: 6721975,
		gasPrice: "20000000000",
	});
};
beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	bet = await new web3.eth.Contract(compiledContract.abi)
		.deploy({ data: compiledContract.evm.bytecode.object, arguments: [2] })
		.send({ from: accounts[0], gasPrice: "20000000000", gas: 6721975 });
	await bet.methods.enterBet().send({
		value: "3",
		from: accounts[0],
		gas: "100000",
	});
	const participants = await bet.methods.getContestants().call();
	assert.ok(participants.includes(accounts[0]));
});

describe("Formula 1 Bet", () => {
	it("Bet is deployed", () => {
		assert.ok(bet.options.address);
	});
	it("The manager is correct", async () => {
		const manager = await bet.methods.manager().call();
		assert.equal(manager, accounts[0]);
	});
	it("Contestant can enter", async () => {
		await bet.methods.enterBet().send({
			value: "3",
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const participants = await bet.methods.getContestants().call();
		assert.ok(participants.includes(accounts[1]));
	});
	it("Minimum contribution required", async () => {
		try {
			await bet.methods.enterBet().send({
				value: "1",
				from: accounts[1],
				gas: 6721975,
				gasPrice: "20000000000",
			});
		} catch (err) {
			assert.ok(err);
		}
	});
	it("Can predict constructors", async () => {
		await bet.methods.predictConstructorsTable(constructorsPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can set constructors", async () => {
		await bet.methods.setConstructorsTable(constructorsPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can calculate constructors", async () => {
		enterBet(accounts[1]);
		enterBet(accounts[2]);
		enterCprediction(accounts[0], constructorsPrediction);
		enterCprediction(accounts[1], constructorsPrediction2);
		enterCprediction(accounts[2], constructorsPrediction3);
		await bet.methods.setConstructorsTable(constructorsPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p0Points = await bet.methods.getContestansCPoints().call({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p1Points = await bet.methods.getContestansCPoints().call({
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p2Points = await bet.methods.getContestansCPoints().call({
			from: accounts[2],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.equal(p0Points, 50);
		assert.equal(p1Points, 42);
		assert.equal(p2Points, 25);
	});
	it("Can predict drivers", async () => {
		await bet.methods.predictDriversTable(driverPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can set drivers", async () => {
		await bet.methods.setConstructorsTable(driverPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can calculate drivers", async () => {
		enterBet(accounts[1]);
		enterBet(accounts[2]);
		enterDprediction(accounts[0], driverPrediction);
		enterDprediction(accounts[1], driverPrediction2);
		enterDprediction(accounts[2], driverPrediction3);
		await bet.methods.setDriversTable(driverPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p0Points = await bet.methods.getContestansDPoints().call({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p1Points = await bet.methods.getContestansDPoints().call({
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p2Points = await bet.methods.getContestansDPoints().call({
			from: accounts[2],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.equal(p0Points, 100);
		assert.equal(p1Points, 96);
		assert.equal(p2Points, 89);
	});
	it("Can predict checo wins", async () => {
		await bet.methods.predictChecoWins(2).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can set checo wins", async () => {
		await bet.methods.setChecoWins(2).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.ok(true);
	});
	it("Can calculate checo points", async () => {
		enterBet(accounts[1]);
		enterBet(accounts[2]);
		enterChprediction(accounts[0], 2);
		enterChprediction(accounts[1], 3);
		enterChprediction(accounts[2], 1);
		await bet.methods.setChecoWins(2).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p0Points = await bet.methods.getContestansChPoints().call({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p1Points = await bet.methods.getContestansChPoints().call({
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p2Points = await bet.methods.getContestansChPoints().call({
			from: accounts[2],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		assert.equal(p0Points, 4);
		assert.equal(p1Points, 0);
		assert.equal(p2Points, 0);
	});
	it("Can calculate final points and winner", async () => {
		enterBet(accounts[1]);
		enterBet(accounts[2]);
		enterCprediction(accounts[0], constructorsPrediction);
		enterCprediction(accounts[1], constructorsPrediction2);
		enterCprediction(accounts[2], constructorsPrediction3);
		enterDprediction(accounts[0], driverPrediction);
		enterDprediction(accounts[1], driverPrediction2);
		enterDprediction(accounts[2], driverPrediction3);
		enterChprediction(accounts[0], 2);
		enterChprediction(accounts[1], 3);
		enterChprediction(accounts[2], 1);
		await bet.methods.setConstructorsTable(constructorsPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.setDriversTable(driverPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.setChecoWins(2).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p0Points = await bet.methods.getContestansTPoints().call({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p1Points = await bet.methods.getContestansTPoints().call({
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const p2Points = await bet.methods.getContestansTPoints().call({
			from: accounts[2],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		const winner = await bet.methods
			.winner()
			.call({ from: accounts[0], gas: 6721975, gasPrice: "20000000000" });
		assert.equal(p0Points, 154);
		assert.equal(p1Points, 138);
		assert.equal(p2Points, 114);
		assert.equal(accounts[0], winner);
	});
	it("Can calculate final points and winner", async () => {
		enterBet(accounts[1]);
		enterBet(accounts[2]);
		enterCprediction(accounts[0], constructorsPrediction);
		enterCprediction(accounts[1], constructorsPrediction2);
		enterCprediction(accounts[2], constructorsPrediction3);
		enterDprediction(accounts[0], driverPrediction);
		enterDprediction(accounts[1], driverPrediction2);
		enterDprediction(accounts[2], driverPrediction3);
		enterChprediction(accounts[0], 2);
		enterChprediction(accounts[1], 3);
		enterChprediction(accounts[2], 1);
		await bet.methods.setConstructorsTable(constructorsPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.setDriversTable(driverPrediction).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.setChecoWins(2).send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.acceptWinner().send({
			from: accounts[0],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		await bet.methods.acceptWinner().send({
			from: accounts[1],
			gas: 6721975,
			gasPrice: "20000000000",
		});
		var balance = await web3.eth.getBalance(accounts[0]);
		balance = balance / 1000000000000000000;
		assert.ok(balance > 1055);
	});
});
