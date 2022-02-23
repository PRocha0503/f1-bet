import web3 from "./web3";
import CompiledBet from "./build/FormulaBet.json";

const bet = new web3.eth.Contract(
	CompiledBet.abi,
	"0x781E60c35c789dE509C6B99F3bE928409eBb6F87"
);

export default bet;
