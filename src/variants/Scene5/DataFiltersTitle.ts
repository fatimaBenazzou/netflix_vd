import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "calc(50vw - 50%)",
	y: "0",
};
export const DataFiltersTitle: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step5: {
		opacity: 1,
		x: "calc(50vw - 50%)",
		y: "100%",
		z: 100,
		transition,
	},
});
