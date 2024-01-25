import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(10vw)",
	y: "calc(100vh + 50%)",
	transitionEnd: {
		display: "none",
	},
};
export const Text: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step11: {
		display: "flex",
		opacity: 1,
		x: "calc(10vw)",
		y: "calc(50vh - 50% )",
		z: 100,
		transition,
	},
});
