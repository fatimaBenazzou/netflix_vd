import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
//import AnimatedImage from "@/Components/AnimatedImage";
import { Scene2_MenuIContainer, Scene2_MenuItems, Scene2_MenuTitle } from "@/variants";
//import AnimatedTyping from "@/Components/AnimatedTyping";
import { SceneComponent } from "@/types/animation";
import SuspenseImage from "@/Components/SuspenseImage";
const generatePoints = (width: number) => {
	const pointCount = Math.floor(width / 10); // Adjust 10 based on your preference
	return Array(pointCount).fill("•").join("");
};
//import { ArrowDown2 } from "iconsax-react";
const menuPagination = 1,
	menuStartingPage = 2 + menuPagination;
const menuContent = [
	{
		name: "Introduction",
		page: menuStartingPage,
	},
	{
		name: "Data set",
		page: menuStartingPage + 1,
	},
	{
		name: "Analyse de Data set",
		page: menuStartingPage + 2,
	},
	{
		name: "Visualisation de données",
		page: menuStartingPage + 3,
	},
	{
		name: "Détails du Catalogue Netflix",
		page: menuStartingPage + 4,
	},
	{
		name: "Programmes par Pays",
		page: menuStartingPage + 5,
	},
	{
		name: "Analyse des genres",
		page: menuStartingPage + 6,
	},
	{
		name: "Analyse des durées des films et des series TV",
		page: menuStartingPage + 7,
	},
	{
		name: "Conclusion",
		page: menuStartingPage + 8,
	},
];
const Scene2: SceneComponent = function ({ currentVariantName, setCurrentNumberStep, /* currentStep, pushHistory, */ size }) {
	return (
		<>
			<AnimatedComponent
				variants={Scene2_MenuTitle(size)}
				animate={currentVariantName}
				className="text-8xl text-center right-0 text-white fixed flex flex-col items-center gap-8"
			>
				<SuspenseImage className="w-28 h-28" src={"/logo.svg"} alt="random" />
				MENU
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene2_MenuIContainer(size)}
				animate={currentVariantName}
				className="fixed gap-8 flex flex-col w-1/2"
			>
				{menuContent.map((item, index) => (
					<AnimatedComponent
						key={index}
						variants={Scene2_MenuItems(size)}
						animate={currentVariantName}
						onClick={() => setCurrentNumberStep(item.page)}
						className="text-2xl text-center text-white flex justify-between hover:cursor-pointer hover:text-primary-500"
					>
						<span>{item.name}</span>
						<span>{generatePoints(((size.width || 150) * 2) / 5)}</span> {/* Adjust the width as needed */}
						<span>{item.page}</span>
					</AnimatedComponent>
				))}
			</AnimatedComponent>
		</>
	);
};
export default Scene2;
