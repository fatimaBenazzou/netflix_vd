import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(50vw - 50%)",
	y: "120vh",
};
export const Year_Slider: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step10: {
		opacity: 1,
		x: "calc(50vw - 50%)",
		y: "calc(100vh - 150%)",
		z: 100,
		transition,
	},
});
