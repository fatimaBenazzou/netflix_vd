import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "calc(50vw - 35%)",
	y: "calc(50vh - 50%)",
	transitionEnd: {
		display: "none",
	},
};
export const DataFiltersText: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step5: {
		display: "flex",
		opacity: 1,
		x: "calc(50vw - 35%)",
		y: "calc(60vh - 50%)",
		transition,
	},
});
