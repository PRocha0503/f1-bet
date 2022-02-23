import React from "react";
import { useEffect, useState } from "react";
import bet from "../ethereum/bet";
import "tailwindcss/tailwind.css";
import web3 from "../ethereum/web3";
import Card from "../components/card";
import Image from "next/image";
import Info from "../components/info";
import Link from "next/link";
const mainPage = () => {
	const [infoType, setInfoType] = useState();
	const [info, setInfo] = useState();
	const [accounts, setAccounts] = useState();
	useEffect(() => {
		const getInitialinfo = async () => {
			try {
				// console.log(bet);
				// const initialBet = await bet.methods.manager().call();
				// console.log(initialBet);
				const tempAccounts = await web3.eth.getAccounts();
				setAccounts(tempAccounts);
			} catch (e) {
				console.log(e);
			}
		};
		getInitialinfo();
	}, []);
	const enterBet = async () => {
		await bet.methods.enterBet().send({
			from: accounts[0],
			value: "3",
			gas: "100000",
		});
	};
	const getContestants = async () => {
		try {
			const contestants = await bet.methods.getContestants().call();
			console.log(contestants);
			setInfo(contestants);
			setInfoType("contestants");
		} catch (e) {
			console.log(e);
		}
	};
	const calculateResults = async () => {
		const calculate = await bet.methods.calculateResults().send({
			from: accounts[0],
			gas: "1000000",
		});
		console.log(calculate);
		setInfo(calculate);
		setInfoType("calculate");
	};
	const getPoints = async () => {
		try {
			const points = [];
			const cpoints = await bet.methods
				.getContestansCPoints()
				.call({ from: accounts[0] });
			const dpoints = await bet.methods
				.getContestansDPoints()
				.call({ from: accounts[0] });
			const chpoints = await bet.methods
				.getContestansChPoints()
				.call({ from: accounts[0] });
			const tpoints = await bet.methods
				.getContestansTPoints()
				.call({ from: accounts[0] });
			points.push(cpoints);
			points.push(dpoints);
			points.push(chpoints);
			points.push(tpoints);
			console.log(points);
			setInfo(points);
			setInfoType("points");
		} catch (e) {
			console.log(e);
		}
	};
	const getWinner = async () => {
		try {
			const winner = await bet.methods.winner().call();
			console.log(winner);
			setInfo(winner);
			setInfoType("winner");
		} catch (e) {
			console.log(e);
		}
	};
	const aproveWinner = async () => {
		try {
			console.log("HERE");
			console.log("fdsfdsfdsf");
			await bet.methods.acceptWinner().send({
				from: accounts[0],
				gas: "10000000",
			});

			setInfo("");
			setInfoType("aprove");
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<body className=" sm:flex">
				<div className="w-full sm:w-1/3 bg-slate-800 h-full grid grid-rows-2 grid-flow-col gap-0">
					<div>
						<div className="grid justify-items-stretch">
							<div className="justify-self-end mt-20">
								<h1 className="text-6xl text-white font-bold mr-2">CRYPTO</h1>
							</div>
						</div>
						<div className="w-2/3 mt-20">
							<div className="h-2 bg-white"></div>
							<p className="px-4 text-white font-light tracking-widest text-justify mt-6">
								As a project to learn solidty an bet was made based on the 2022
								Formula 1 Season. Anyone can join the bet iof the contribute at
								least the minimum amount. At the end on the season the final
								results will be entered by the manager. Then the points will be
								calculated, the mony will be given to the winner only if more
								than half of the participants agree with the final results.
							</p>
						</div>
					</div>
					<div className=" grid place-items-center">
						<button
							className="bg-blue-300 py-4 rounded-full w-2/3 text-white font-bold"
							onClick={enterBet}
						>
							JOIN BET NOW
						</button>
					</div>
				</div>
				<div className="w-full sm:ml-4 h-full grid grid-rows-6 grid-flow-col gap-4 px-6">
					<div className="grid justify-items-stretch mt-20">
						<div className="justify-self-start ...">
							<h1 className="text-6xl text-slate-800 font-bold font-bold">
								BET
							</h1>
						</div>
					</div>
					<div className="row-span-5 h-full ">
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-4 h-full">
							<div className="m-auto ">
								<Image
									src="/assets/logo.png"
									alt="Logo"
									width="500"
									height="300"
								></Image>
							</div>
							<div className=" flex  h-full">
								<Link href="/predictions">
									<div className=" bg-slate-800 rounded-lg p-6 m-auto h-full sm:h-5/6 hover:cursor-pointer">
										<div className="flex">
											<h1 className="text-lg sm:text-4xl text-white  mx-auto font-semibold ">
												ENTER PREDICTIONS
											</h1>
										</div>
										<ul className="sm:text-2xl text-white list-disc list-inside my-2 sm:my-6">
											<li className="my-2">Constructors</li>
											<li className="my-2">Drivers</li>
											<li className="my-2">Checo Wins</li>
										</ul>
										<p className="sm:text-lg text-white ">
											For constuctors and drivers:<br></br> 5 points if correct{" "}
											<br></br> 3 ponits if 1 off <br></br> 1 point if 2 off{" "}
											<br></br>4 extra points for guessing number of wins by
											Checo
										</p>
									</div>
								</Link>
							</div>
							<div className="  flex h-full">
								<div className=" grid grid-rows-5 grid-flow-col gap-4 h-full sm:h-5/6 m-auto w-full">
									<button
										className="bg-red-800 rounded-lg text-white text-3xl font-bold"
										onClick={getContestants}
									>
										Get Contestants
									</button>
									<button
										className="bg-red-800 rounded-lg text-white text-3xl font-bold"
										onClick={calculateResults}
									>
										Calculate Results
									</button>
									<button
										className="bg-red-800 rounded-lg text-white text-3xl font-bold"
										onClick={getPoints}
									>
										Get my points
									</button>
									<button
										className="bg-red-800 rounded-lg text-white text-3xl font-bold"
										onClick={getWinner}
									>
										Get winner
									</button>
									<button
										className="bg-red-800 rounded-lg text-white text-3xl font-bold"
										onClick={aproveWinner}
									>
										Accept winner
									</button>
								</div>
							</div>
							<div>
								<div className=" flex  h-full">
									<div className=" bg-black rounded-lg p-6 m-auto  h-full sm:h-5/6 w-full">
										<div className="flex">
											<h1 className="text-4xl text-white  mx-auto font-semibold ">
												INFO
											</h1>
										</div>
										<Info type={infoType} info={info}></Info>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</>
	);
};

export default mainPage;
