import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(100vw + 100%)",
	y: "calc(50vh - 50% + 200px)",
	transitionEnd: {
		display: "none",
	},
};
export const Movies_Text: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step10: {
		display: "flex",
		opacity: 1,
		x: "calc(100vw - 130%)",
		y: "calc(50vh - 50% + 200px)",
		z: 100,
		transition,
	},
});
