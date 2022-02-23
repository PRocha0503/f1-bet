"use strict";
exports.id = 517;
exports.ids = [517];
exports.modules = {

/***/ 517:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ ethereum_bet)
});

// EXTERNAL MODULE: ./ethereum/web3.js
var web3 = __webpack_require__(508);
;// CONCATENATED MODULE: ./ethereum/build/FormulaBet.json
const FormulaBet_namespaceObject = JSON.parse('{"Mt":[{"inputs":[{"internalType":"uint256","name":"_bet","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"acceptWinner","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"bet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateResults","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"checoWins","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enterBet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getContestansCPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContestansChPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContestansDPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContestansTPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContestants","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_checoWin","type":"uint8"}],"name":"predictChecoWins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_constructorsP","type":"string[]"}],"name":"predictConstructorsTable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_driversP","type":"string[]"}],"name":"predictDriversTable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_wins","type":"uint8"}],"name":"setChecoWins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_constructors","type":"string[]"}],"name":"setConstructorsTable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_drivers","type":"string[]"}],"name":"setDriversTable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"winner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"}]}');
;// CONCATENATED MODULE: ./ethereum/bet.js


const bet = new web3/* default.eth.Contract */.Z.eth.Contract(FormulaBet_namespaceObject.Mt, "0x781E60c35c789dE509C6B99F3bE928409eBb6F87");
/* harmony default export */ const ethereum_bet = (bet);


/***/ }),

/***/ 508:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(519);
/* harmony import */ var web3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(web3__WEBPACK_IMPORTED_MODULE_0__);

let web3;
if (false) {} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new (web3__WEBPACK_IMPORTED_MODULE_0___default().providers.HttpProvider)("https://rinkeby.infura.io/v3/cc708442b2bd416bb894fc8c3c03cb2e");
    web3 = new (web3__WEBPACK_IMPORTED_MODULE_0___default())(provider);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (web3);


/***/ })

};
;