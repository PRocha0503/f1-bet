import React from "react";
import "tailwindcss/tailwind.css";
import Image from "next/image";
const PredCard = ({ name, color, type }) => {
	if (type === "drivers") {
		return (
			<>
				<div className={`w-full ${color} h-14 rounded`}>
					<div className="grid grid-cols-4 gap-1">
						<div></div>
						<div className="flex col-span-2 mx-auto mt-5">
							<h1 className="text-white font-bold text-xl">{name}</h1>
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<div
				className={`w-full ${color} h-28 rounded `}
				style={{ position: "relative" }}
			>
				<Image
					src={`/assets/constructors/${name}.png`}
					alt="Logo"
					layout="fill"
				></Image>

				{/* <div className="grid grid-cols-4 gap-4">
					<div></div>
					<div className="flex col-span-2 mx-auto mt-10">
						<h1 className="text-white font-bold text-3xl">{name}</h1>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default PredCard;
