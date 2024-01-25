import { MYVariantsResponsive } from "@/types/animation";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "calc(100vw + 100%)",
	y: "calc(50vh - 34%)",
};
export const CorrelationHeatMap: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step9: {
		opacity: 1,
		x: "calc(-30vw + 70%)",
		y: "calc(50vh - 34%)",
		transition: {
			duration: 0.7,
			type: "spring",
			bounce: 0.2,
		},
	},
});
