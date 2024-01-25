import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import { SceneComponent } from "@/types/animation";

import { Scene6_Title } from "@/variants";

import SuspenseImage from "@/Components/SuspenseImage";

const Scene6: SceneComponent = function ({ currentVariantName, /* setCurrentNumberStep, currentStep, pushHistory, */ size }) {
	return (
		<>
			<AnimatedComponent
				variants={Scene6_Title(size)}
				animate={currentVariantName}
				className="text-8xl text-center text-white fixed flex flex-col items-center gap-8"
			>
				<SuspenseImage className="w-28 h-28" src={"/logo.svg"} alt="random" />
				Visualisation de données
			</AnimatedComponent>
		</>
	);
};
export default Scene6;
