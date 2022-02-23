import web3 from "./web3";
import CompiledBet from "./build/FormulaBet.json";

const bet = new web3.eth.Contract(
	CompiledBet.abi,
	"0x73f6c58F0F001425eed4C6647aaF79Dd64c7ca9E"
);

export default bet;
