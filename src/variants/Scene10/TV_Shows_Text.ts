import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(-100%)",
	y: "calc(50vh - 50% + 200px)",
};
export const TV_Shows_Text: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step10: {
		opacity: 1,
		x: "calc(20%)",
		y: "calc(50vh - 50% + 200px)",
		z: 100,
		transition,
	},
});
