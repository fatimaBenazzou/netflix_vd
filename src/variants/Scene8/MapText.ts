import { MYVariantsResponsive } from "@/types/animation";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "100vw",
	y: "calc(-50vh + 50%)",
	scale: 0.5,
};
export const MapText: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step8: {
		opacity: 1,
		x: "-50%",
		y: "calc(-50vh + 50%)",
		scale: 1,
		transition: {
			duration: 0.7,
			type: "spring",
			bounce: 0.2,
		},
	},
});
