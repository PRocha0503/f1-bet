import React from "react";
import { useEffect, useState } from "react";
import bet from "../ethereum/bet";
import web3 from "../ethereum/web3";
import "tailwindcss/tailwind.css";
import PredCard from "../components/predCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Link from "next/link";
const constructors = [
	["Mercedes", "bg-gray-700"],
	["Red Bull", "bg-blue-900"],
	["Ferrari", "bg-red-700"],
	["McLaren", "bg-orange-500"],
	["Alpine", "bg-blue-600"],
	["Alpha Tauri", "bg-gray-300"],
	["Aston", "bg-green-800"],
	["Williams", "bg-blue-300"],
	["Hass", "bg-gray-200"],
	["A. Romeo", "bg-red-400"],
];
const drivers = [
	["Lewis Hamilton", "bg-gray-700"],
	["George Russel", "bg-gray-700"],
	["Max Verstappen", "bg-blue-900"],
	["Sergio Perez", "bg-blue-900"],
	["Charles Leclerc", "bg-red-700"],
	["Carlos Sainz", "bg-red-700"],
	["Lando Norris", "bg-orange-500"],
	["Daniel Ricardo", "bg-orange-500"],
	["Fernando Alonso", "bg-blue-600"],
	["Esteban Ocon", "bg-blue-600"],
	["Pierre Gasly", "bg-gray-300"],
	["Yuki Tsunoda", "bg-gray-300"],
	["Sebastian Vettel", "bg-green-800"],
	["Lance Stroll", "bg-green-800"],
	["Nicolas Latifi", "bg-blue-300"],
	["Alex Albon", "bg-blue-300"],
	["Mick Schumacher", "bg-gray-200"],
	["Nikita Mazepin", "bg-gray-200"],
	["Valteri Bottas", "bg-red-400"],
	["Guanyu Zhou", "bg-red-400"],
];
const Predictions = () => {
	const [constructorsOrder, setConstructorsOrder] = useState(constructors);
	const [driversOrder, setDriversOrder] = useState(drivers);
	const [pChecosWins, setPChecosWins] = useState();
	const [isAdmin, setIsAdmin] = useState(false);
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(constructorsOrder);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setConstructorsOrder(items);
	};
	const handleOnDragEndDrivers = (result) => {
		if (!result.destination) return;
		const items = Array.from(driversOrder);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setDriversOrder(items);
	};
	const enableAdmin = async () => {
		try {
			const accounts = await web3.eth.getAccounts();
			const manager = await bet.methods.manager().call();
			console.log(accounts);
			if (accounts.includes(manager)) {
				setIsAdmin(true);
			} else {
				throw new Error("Is not admin");
			}
		} catch (e) {
			console.log(e);
		}
	};
	const predictConstructors = async (predictions) => {
		console.log(predictions);
		try {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0]);
			await bet.methods.predictConstructorsTable(predictions).send({
				from: accounts[0],
				gas: "1000000",
			});
			console.log("constructors has been predicted");
		} catch (e) {
			console.log(e);
		}
	};
	const predictDrivers = async (predictions) => {
		console.log(predictions);
		try {
			const accounts = await web3.eth.getAccounts();
			await bet.methods.predictDriversTable(predictions).send({
				from: accounts[0],
				gas: "1000000",
			});
			console.log("drivers has been predicted");
		} catch (e) {
			console.log(e);
		}
	};
	const setConstructors = async (predictions) => {
		console.log(predictions);
		try {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0]);
			await bet.methods.setConstructorsTable(predictions).send({
				from: accounts[0],
				gas: "1000000",
			});
			console.log("constructors has been set");
		} catch (e) {
			console.log(e);
		}
	};
	const setDrivers = async (predictions) => {
		console.log(predictions);
		try {
			const accounts = await web3.eth.getAccounts();
			await bet.methods.setDriversTable(predictions).send({
				from: accounts[0],
				gas: "1000000",
			});
			console.log("drivers has been set");
		} catch (e) {
			console.log(e);
		}
	};
	const predictChecosWins = async (e) => {
		e.preventDefault();
		console.log(pChecosWins);
		try {
			const accounts = await web3.eth.getAccounts();
			await bet.methods.predictChecoWins(pChecosWins).send({
				from: accounts[0],
				gas: "100000",
			});
			console.log("checp has been predicted");
		} catch (e) {
			console.log(e);
		}
	};
	const setChecosWins = async () => {
		console.log(pChecosWins);
		try {
			const accounts = await web3.eth.getAccounts();
			await bet.methods.setChecoWins(pChecosWins).send({
				from: accounts[0],
				gas: "100000",
			});
			console.log("checo has been set");
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<div className="h-12 w-full bg-white">
				<div className="h-full flex w-1/3">
					<Link href="/">
						<div className="m-auto bg-slate-800 p-1 rounded-lg text-white hover:cursor-pointer">
							Home
						</div>
					</Link>
				</div>
			</div>
			<body className="bg-slate-800 ">
				<div className=" flex mt-10 ">
					<div className="m-auto flex">
						<h1 className=" text-white text-3xl font-bold  mx-4 h-10">
							Checo Wins
						</h1>
						<form onSubmit={predictChecosWins} className="flex">
							<div>
								<input
									type="text"
									placeholder="0"
									value={pChecosWins}
									onChange={(e) => setPChecosWins(e.target.value)}
									className="h-10 border-2 rounded-lg"
								></input>
							</div>
							<div>
								<input
									type="submit"
									value="Predict"
									className="bg-blue-300 rounded-lg py-1 px-2 text-white h-10 mx-4"
								></input>
							</div>
							{isAdmin ? (
								<button
									onClick={async () => {
										await setChecosWins();
									}}
									className=" bg-orange-300 rounded-lg py-1 px-2 text-white h-10 mx-4"
								>
									Set Checo Wins Final Results (only admin)
								</button>
							) : (
								<></>
							)}
						</form>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-4 py-20">
					<div></div>
					<div>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="constructors">
								{(provided) => (
									<ul
										className="grid grid-rows-10 gap-1 bg-red-100 p-2 rounded-lg"
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{constructorsOrder.map((constructor, i) => (
											<Draggable
												key={constructor[0]}
												draggableId={constructor[0]}
												index={i}
											>
												{(provided) => (
													<li
														{...provided.draggableProps}
														ref={provided.innerRef}
														{...provided.dragHandleProps}
													>
														<PredCard
															name={constructor[0]}
															color={constructor[1]}
														></PredCard>
													</li>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
						<button
							onClick={async () => {
								const finalPlaces = constructorsOrder.map((c) => c[0]);
								await predictConstructors(finalPlaces);
							}}
							className=" w-full bg-blue-300 my-4 h-20 rounded-lg text-white font-bold text-lg"
						>
							Enter Constructors Prediction
						</button>
						{isAdmin ? (
							<button
								onClick={async () => {
									const finalPlaces = constructorsOrder.map((c) => c[0]);
									await setConstructors(finalPlaces);
								}}
								className=" w-full bg-orange-300 my-4 h-20 rounded-lg text-white font-bold text-lg"
							>
								Set Constructors Final Results (only admin)
							</button>
						) : (
							<></>
						)}
					</div>
					<div>
						<DragDropContext onDragEnd={handleOnDragEndDrivers}>
							<Droppable droppableId="drivers">
								{(provided) => (
									<ul
										className="grid grid-rows-10 gap-1 bg-gray-100 p-2 rounded-lg"
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{driversOrder.map((driver, i) => (
											<Draggable
												key={driver[0]}
												draggableId={driver[0]}
												index={i}
											>
												{(provided) => (
													<li
														{...provided.draggableProps}
														ref={provided.innerRef}
														{...provided.dragHandleProps}
													>
														<PredCard
															name={driver[0]}
															color={driver[1]}
															type="drivers"
														></PredCard>
													</li>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
						<button
							onClick={async () => {
								const finalPlaces = driversOrder.map((c) => c[0]);
								await predictDrivers(finalPlaces);
							}}
							className=" w-full bg-blue-300 my-4 h-20 rounded-lg text-white font-bold text-lg"
						>
							Enter Drivers Prediction
						</button>
						{isAdmin ? (
							<button
								onClick={async () => {
									const finalPlaces = driversOrder.map((c) => c[0]);
									await setDrivers(finalPlaces);
								}}
								className=" w-full bg-orange-300 my-4 h-20 rounded-lg text-white font-bold text-lg"
							>
								Set Drivers Final Results(only admin)
							</button>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="flex">
					<button
						className="w-2/3 h-20 bg-white my-10 m-auto rounded-lg bg-gray-900 text-white text-xl font-bold"
						onClick={enableAdmin}
					>
						Prove you are admin (Will get an error if you are not admin)
					</button>
				</div>
			</body>
		</>
	);
};
export default Predictions;
