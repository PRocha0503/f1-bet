pragma solidity >=0.7.0 <0.9.0;


contract FormulaBet{
    struct ContestantPrediction {
         string[] constructors;
         string[] drivers;
         uint8 checoWins;
         bool hasPredictedCW;
         uint constructorsPoints;
         uint driversPoints;
         uint checoPoints;
         uint totalPoints;
    }
    mapping(address => ContestantPrediction) predictions;
    address[] contestants;
    address payable public winner;
    uint price;
    string[] constructors;
    string[] drivers;
    uint8 public checoWins;
    address public manager;
    uint public bet;
    mapping(address =>bool) hasVoted;
    uint approvers;
    
    constructor(uint _bet)  {
        manager = msg.sender;
        bet = _bet;
    }
    modifier notOnBet(){
        for (uint8 i = 0; i < contestants.length; ++i) {
            if(contestants[i]==msg.sender){
                revert("Contestant is alrady in the bet");
            }
        }
        _;
    }
    modifier isOnBet(){
        bool isContestant;
        for (uint8 i = 0; i < contestants.length; ++i) {
            if(contestants[i]==msg.sender){
               isContestant = true;
            }
        }
        require(isContestant);
        _;
    }

    modifier isManager(){
        require(msg.sender == manager);
        _;
    }

    function setConstructorsTable(string[] memory _constructors)public isManager{
        constructors = _constructors;
    }
    function setDriversTable(string[] memory _drivers)public isManager{
        drivers = _drivers;
    }
    function setChecoWins(uint8 _wins)public isManager{
        checoWins = _wins;
    }

    function enterBet()  public payable notOnBet{
        require(msg.value > bet);
        price += msg.value;
        contestants.push(msg.sender);
    }

    function getContestants() public view returns( address[] memory){
        return contestants;
    }

    function predictConstructorsTable(string[] memory _constructorsP)public isOnBet{
        require(_constructorsP.length == 10);
        require(predictions[msg.sender].constructors.length == 0);
        predictions[msg.sender].constructors = _constructorsP;
    }

    function predictDriversTable(string[] memory _driversP)public isOnBet{
        require(_driversP.length == 20);
        require(predictions[msg.sender].drivers.length == 0);
        predictions[msg.sender].drivers = _driversP;
    }
    function predictChecoWins(uint8 _checoWin)public isOnBet{
        require(_checoWin >= 0);
        require(!predictions[msg.sender].hasPredictedCW);
        predictions[msg.sender].checoWins = _checoWin;
        predictions[msg.sender].hasPredictedCW = true;
    }
    function checkStingEquality(string memory s1, string memory s2) private pure returns(bool){
        if(keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2))){
            return true;
        }
        return false;
    }
    function calculateConstructorsTable() private {
        for(uint8 i; i<contestants.length;i++){
            string[] memory contestantPrediction = predictions[contestants[i]].constructors;
            uint points;
            for(uint8 j; j<constructors.length;j++){
                if(j<1){
                    if(checkStingEquality(contestantPrediction[j],constructors[j])){
                        points+= 5;
                    }else if( checkStingEquality(contestantPrediction[j+1],constructors[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantPrediction[j+2],constructors[j])){
                        points+=1;
                    }
                }else if(j<2){
                    if(checkStingEquality(contestantPrediction[j],constructors[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantPrediction[j-1],constructors[j]) || checkStingEquality(contestantPrediction[j+1],constructors[j])){
                        points+=3;
                    }
                    else if( checkStingEquality(contestantPrediction[j+2],constructors[j])){
                        points+=1;
                    }
                }else if(j==constructors.length-2){
                    if(checkStingEquality(contestantPrediction[j],constructors[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantPrediction[j-1],constructors[j]) || checkStingEquality(contestantPrediction[j+1],constructors[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantPrediction[j-2],constructors[j])){
                        points+=1;
                    }
                }else if(j==constructors.length-1){
                    if(checkStingEquality(contestantPrediction[j],constructors[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantPrediction[j-1],constructors[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantPrediction[j-2],constructors[j])){
                        points+=1;
                    }
                }else{
                    if(checkStingEquality(contestantPrediction[j],constructors[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantPrediction[j-1],constructors[j]) || checkStingEquality(contestantPrediction[j+1],constructors[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantPrediction[j-2],constructors[j]) || checkStingEquality(contestantPrediction[j+2],constructors[j])){
                        points+=1;
                    }
                }
            }
            predictions[contestants[i]].constructorsPoints = points;
        }
    
    }
    function calculateDriversTable() private {
        for(uint8 i; i<contestants.length;i++){
            string[] memory contestantDriversPrediction = predictions[contestants[i]].drivers;
            uint points;
            for(uint8 j; j<drivers.length;j++){
                if(j<1){
                    if(checkStingEquality(contestantDriversPrediction[j],drivers[j])){
                        points+= 5;
                    }else if( checkStingEquality(contestantDriversPrediction[j+1],drivers[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantDriversPrediction[j+2],drivers[j])){
                        points+=1;
                    }
                }else if(j<2){
                    if(checkStingEquality(contestantDriversPrediction[j],drivers[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantDriversPrediction[j-1],drivers[j]) || checkStingEquality(contestantDriversPrediction[j+1],drivers[j])){
                        points+=3;
                    }
                    else if( checkStingEquality(contestantDriversPrediction[j+2],drivers[j])){
                        points+=1;
                    }
                }else if(j==drivers.length-2){
                    if(checkStingEquality(contestantDriversPrediction[j],drivers[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantDriversPrediction[j-1],drivers[j]) || checkStingEquality(contestantDriversPrediction[j+1],drivers[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantDriversPrediction[j-2],drivers[j])){
                        points+=1;
                    }
                }else if(j==drivers.length-1){
                    if(checkStingEquality(contestantDriversPrediction[j],drivers[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantDriversPrediction[j-1],drivers[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantDriversPrediction[j-2],drivers[j])){
                        points+=1;
                    }
                }else{
                    if(checkStingEquality(contestantDriversPrediction[j],drivers[j])){
                        points+= 5;
                    }else if(checkStingEquality(contestantDriversPrediction[j-1],drivers[j]) || checkStingEquality(contestantDriversPrediction[j+1],drivers[j])){
                        points+=3;
                    }
                    else if(checkStingEquality(contestantDriversPrediction[j-2],drivers[j]) || checkStingEquality(contestantDriversPrediction[j+2],drivers[j])){
                        points+=1;
                    }
                }
            }
            predictions[contestants[i]].driversPoints = points;
        }
    }
    function calculateChecoPoints() private {
        for(uint8 i; i<contestants.length;i++){
            uint8 contestantChecoPrediction = predictions[contestants[i]].checoWins;
            if(checoWins == contestantChecoPrediction){
                predictions[contestants[i]].checoPoints = 4;
            }
        }
    }
    function calculateFinalPoints() private {
         uint maxPoints;
         for(uint8 i; i<contestants.length;i++){
            uint finalPoints = predictions[contestants[i]].constructorsPoints + predictions[contestants[i]].driversPoints + predictions[contestants[i]].checoPoints;
            predictions[contestants[i]].totalPoints = finalPoints;
            if(maxPoints < finalPoints){
                maxPoints = finalPoints;
                address payable payableWinner = payable(contestants[i]);
                winner = payableWinner;
            }
        }
     }
    function acceptWinner() public payable isOnBet{
        require(hasVoted[msg.sender] == false);
        approvers += 1;
        hasVoted[msg.sender] = true;
        if(approvers > contestants.length/2){
            winner.transfer(address(this).balance);
        }
    }

 

    function calculateResults() public isOnBet {
        calculateConstructorsTable();
        calculateDriversTable();
        calculateChecoPoints();
        calculateFinalPoints();
    }

    function getContestansCPoints() public view isOnBet returns(uint){
        return  predictions[msg.sender].constructorsPoints;
    }
    function getContestansDPoints() public view isOnBet returns(uint){
        return  predictions[msg.sender].driversPoints;
    }
    function getContestansChPoints() public view isOnBet returns(uint){
        return  predictions[msg.sender].checoPoints;
    }
    function getContestansTPoints() public view isOnBet returns(uint){
        return  predictions[msg.sender].totalPoints;
    }
}   