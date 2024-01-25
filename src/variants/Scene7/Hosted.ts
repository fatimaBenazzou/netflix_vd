import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "-100vw",
	y: "calc(50vh + 100%)",
};
export const Hosted: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step7: {
		opacity: 1,
		x: "20%",
		y: "calc(50vh + 50%)",
		z: 100,
		transition,
	},
});
