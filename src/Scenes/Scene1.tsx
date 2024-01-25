import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
//import AnimatedImage from "@/Components/AnimatedImage";
import SuspenseImage from "@/Components/SuspenseImage";
import { Hero as HeroVariants } from "@/variants";
//import AnimatedTyping from "@/Components/AnimatedTyping";
import { SizeWithVariant } from "@/types/animation";
import { ArrowDown2 } from "iconsax-react";

export default function Scene1({
	currentVariantName,
	size /* currentStep,*/,
	setCurrentNumberStep,
}: {
	currentVariantName: string;
	currentStep: number;
	setCurrentNumberStep: (step: number) => void;
	size: SizeWithVariant;
}) {
	return (
		<>
			<AnimatedComponent
				variants={HeroVariants(size)}
				animate={currentVariantName}
				className="text-black flex-col items-center gap-8 fixed"
			>
				<SuspenseImage className="w-28 h-28" src={"/logo.svg"} alt="random" />
				<h1 className="text-8xl text-center">
					projet
					<br />
					<span className="tracking-tighter">Visualisation de données</span>
				</h1>
				<p className="text-xl max-w-2xl text-center text-gray-800 font-[Poppins]">
					<span className=" text-primary-500">Explorez</span> l'univers de Netflix à travers des visualisations interactives.
					Découvrez les tendances, les pays de production, et plongez dans les insights fascinants que les données révèlent sur la
					célèbre plateforme de streaming.
				</p>
				<button
					onClick={() => {
						setCurrentNumberStep(2);
					}}
					className="text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white  rounded-full shadow-primary-100 shadow-xl px-10 py-4 text-xl flex items-center gap-2  hover:scale-110 transition-all duration-300"
				>
					<ArrowDown2 variant="Bulk" className="w-8 h-8" />
					Let's start
				</button>
			</AnimatedComponent>
		</>
	);
}
