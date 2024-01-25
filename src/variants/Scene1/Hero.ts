import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
import { Variant } from "framer-motion";
const initial: Variant = {
	opacity: 1,
	display: "flex",
	x: "calc(50vw - 50%)",
	y: -100,
	z: 100,
};
const hidden: Variant = {
	transitionEnd: {
		display: "none",
	},
	opacity: 0,
	x: "calc(50vw - 50%)",
	y: -300,
};
export const Hero: MYVariantsResponsive = () => ({
	hidden: hidden,
	exit: hidden,
	initial: initial,
	step1: {
		...initial,
		y: 100,
		transition,
	},
});
