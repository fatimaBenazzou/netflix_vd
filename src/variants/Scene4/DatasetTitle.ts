import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "-100vw",
	y: "calc(50vh - 50%)",
};
export const DatasetTitle: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step4: {
		opacity: 1,
		x: "10vw",
		y: "calc(50vh - 50%)",
		z: 100,
		transition,
	},
});
