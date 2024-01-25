import DragHandler from "@/functions/DragHandler";
import { useScrollSteps } from "@/hooks/useScrollSteps";
import { useWindowSize } from "@uidotdev/usehooks";
import SizeToVariant from "@/functions/SizeToVariant";
import { SceneProps } from "@/types/animation";
import { ArrowLeft2, ArrowUp2 } from "iconsax-react";
import useSelectedVariant from "./useSelectedVariant";

import { lazy } from "react";
const Scene1 = lazy(() => import("@/Scenes/Scene1"));
const Scene2 = lazy(() => import("@/Scenes/Scene2"));
const Scene3 = lazy(() => import("@/Scenes/Scene3"));
const Scene4 = lazy(() => import("@/Scenes/Scene4"));
const Scene5 = lazy(() => import("@/Scenes/Scene5"));
const Scene6 = lazy(() => import("@/Scenes/Scene6"));
const Scene7 = lazy(() => import("@/Scenes/Scene7"));
const Scene8 = lazy(() => import("@/Scenes/Scene8"));
const Scene9 = lazy(() => import("@/Scenes/Scene9"));
const Scene10 = lazy(() => import("@/Scenes/Scene10"));
const Scene11 = lazy(() => import("@/Scenes/Scene11"));

const Tooltip = lazy(() => import("@/Components/Tooltip"));

const dragHandler = new DragHandler();
const [globalMinSteps, globalMaxSteps] = [1, 11];
const backgroundSwitchStep = 2;

export default function Home() {
	// create Tooltip global state

	const { currentStep, setCurrentStep: setCurrentNumberStep } = useScrollSteps(dragHandler, 1, {
		minSteps: globalMinSteps,
		maxSteps: globalMaxSteps,
	});

	const { currentVariant, popHistory, hasSelectedHistory, pushHistory } = useSelectedVariant(currentStep);

	const size = SizeToVariant(useWindowSize());
	const sceneProps: SceneProps = {
		currentVariantName: currentVariant,
		currentStep: currentStep,
		setCurrentNumberStep: setCurrentNumberStep,
		size: size,
		pushHistory,
	};
	return (
		// context for Tooltip

		<div className={`w-screen h-screen flex overflow-hidden bg-black`}>
			<div
				className={
					"transition-opacity duration-500 rounded-full bg-white fixed bottom-0 left-[7vw] w-[86vw] h-[200vh] blur-3xl " +
					(currentStep < backgroundSwitchStep ? "opacity-85 " : "opacity-0")
				}
			></div>
			{/* shows only in vite dev */}
			<p className="fixed top-2 left-2 py-2 px-4 border-2 shadow-xl bg-white rounded-full text-2xl flex gap-2 items-center ">
				<span>
					{currentStep}/{globalMaxSteps}
				</span>
				{process.env.NODE_ENV === "development" && (
					<>
						: <span className="text-primary-500">{currentVariant}</span>
					</>
				)}
			</p>

			<Scene1 {...sceneProps} />
			<Scene2 {...sceneProps} />
			<Scene3 {...sceneProps} />
			<Scene4 {...sceneProps} />
			<Scene5 {...sceneProps} />
			<Scene6 {...sceneProps} />
			<Scene7 {...sceneProps} />
			<Scene8 {...sceneProps} />
			<Scene9 {...sceneProps} />
			<Scene10 {...sceneProps} />
			<Scene11 {...sceneProps} />

			<button
				onClick={() => {
					setCurrentNumberStep(1);
				}}
				className={`fixed bottom-4 right-4 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transition-all duration-300 bg-primary-500 border-primary-500 border-2 hover:bg-white hover:text-primary-500 ${
					currentStep > 1 ? "" : "hidden"
				}`}
			>
				<ArrowUp2 variant="Bulk" className="w-10 h-10" />
			</button>
			<button
				onClick={() => {
					popHistory();
				}}
				className={`fixed bottom-4 left-4 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-300 border-primary-500 border-2 bg-white text-primary-500 ${
					hasSelectedHistory ? "" : "hidden"
				}`}
			>
				<ArrowLeft2 variant="Bulk" className="w-10 h-10" />
			</button>
			<Tooltip />
		</div>
	);
}
