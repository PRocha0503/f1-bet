import React from "react";
import "tailwindcss/tailwind.css";

const Info = ({ type, info }) => {
	console.log(type);
	if (type === "contestants") {
		return (
			<>
				<div>
					<h2 className="text-white text-xl mt-20 font-semibold">
						Contestants
					</h2>
					<ul className="list-disc  ">
						{info.map((constestant) => {
							return <li className="truncate text-white">{constestant}</li>;
						})}
					</ul>
				</div>
			</>
		);
	}
	if (type === "calculate") {
		return (
			<>
				<div>
					<h2 className="text-white text-xl mt-20 font-semibold">Calculate</h2>
					<h3 className="text-white">The results have been calculated</h3>
				</div>
			</>
		);
	}
	if (type === "points") {
		return (
			<>
				<div>
					<h2 className="text-white text-xl mt-20 font-semibold">Points</h2>
					<ul className="list-disc  ">
						<li className="truncate text-white">{`Constructors points: ${info[0]}`}</li>
						<li className="truncate text-white">{`Drivers points: ${info[1]}`}</li>
						<li className="truncate text-white">{`Checo Wins points: ${info[2]}`}</li>
						<li className="truncate text-white">{`Total points: ${info[3]}`}</li>
					</ul>
				</div>
			</>
		);
	}
	if (type === "winner") {
		return (
			<>
				<div>
					<h2 className="text-white text-xl mt-20 font-semibold">Winner</h2>
					<h3 className="text-white">{`Congratulations ${info} you won!`}</h3>
				</div>
			</>
		);
	}
	if (type === "aprove") {
		return (
			<>
				<div>
					<h2 className="text-white text-xl mt-20 font-semibold">Aprove</h2>
					<h3 className="text-white">You have approved the winner</h3>
				</div>
			</>
		);
	}
	return (
		<>
			<div className="flex">
				<p className="text-2xl text-white m-auto font-semibold ">
					No info to show
				</p>
			</div>
		</>
	);
};
export default Info;
