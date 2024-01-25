import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "-100vw",
	y: "calc(50vh - 50%)",
};
export const IntroductionContainer: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step3: {
		opacity: 1,
		x: "10vw",
		y: "calc(50vh - 50%)",
		transition,
	},
});
