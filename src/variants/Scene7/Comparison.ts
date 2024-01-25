import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(50vw - 70%)",
	y: "calc(50vh - 60%)",
	transitionEnd: {
		display: "none",
	},
};
export const Comparison: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step7: {
		opacity: 1,
		display: "flex",
		x: "calc(50vw - 70%)",
		y: "calc(50vh - 20%)",
		z: 100,
		transition,
	},
});
