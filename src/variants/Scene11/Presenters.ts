import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(80vw - 50%)",
	y: "calc(100vh + 50%)",
	transitionEnd: {
		display: "none",
	},
};
export const Presenters: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step11: {
		display: "flex",
		opacity: 1,
		x: "calc(80vw - 50%)",
		y: "calc(50vh - 50% )",
		z: 100,
		transition,
	},
});
