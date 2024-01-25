import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "200vw",
	y: "calc(50vh - 40%)",
};
export const Ratings: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step7: {
		opacity: 1,
		x: "-15%",
		y: "calc(50vh - 30%)",
		z: 100,
		transition,
	},
});
