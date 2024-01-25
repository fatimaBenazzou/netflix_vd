import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(50vw - 50%)",
	y: "-100vh",
};
export const Toggler: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step10: {
		opacity: 1,
		x: "calc(50vw - 50%)",
		y: "calc(30vh - 50%)",
		z: 100,
		transition,
	},
});
