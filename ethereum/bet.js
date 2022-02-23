import web3 from "./web3";
import CompiledBet from "./build/FormulaBet.json";

const bet = new web3.eth.Contract(
	CompiledBet.abi,
	"0xaB160D98c611D124D81F4186b804EA38e42E6bd9"
);

export default bet;
