import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: 0,
	y: "calc(50vh - 50%)",
};
export const MenuTitle: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step2: {
		opacity: 1,
		x: "-10vw",
		y: "calc(50vh - 50%)",
		z: 100,
		transition,
	},
});
