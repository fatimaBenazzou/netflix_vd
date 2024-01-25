import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(-100%)",
	y: "calc(50vh - 50%)",
};
export const TV_Shows_BoxAndWhiskers: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step10: {
		opacity: 1,
		x: "calc(50%)",
		y: "calc(50vh - 50%)",
		z: 100,
		transition,
	},
});
