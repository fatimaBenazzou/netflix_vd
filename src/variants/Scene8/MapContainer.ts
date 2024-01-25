import { MYVariantsResponsive } from "@/types/animation";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "-100vw",
	y: "-5%",
	scale: 0.5,
};
export const MapContainer: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step8: {
		opacity: 1,
		x: "calc(20%)",
		y: "-5%",
		scale: 1,
		transition: {
			duration: 0.7,
			type: "spring",
			bounce: 0.2,
		},
	},
});
