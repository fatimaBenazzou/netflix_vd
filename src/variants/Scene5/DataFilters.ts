import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "-100vw",
	y: "calc(60vh - 50%)",
};
export const DataFilters: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step5: {
		opacity: 1,
		x: "5vw",
		y: "calc(60vh - 50%)",
		transition,
	},
});
