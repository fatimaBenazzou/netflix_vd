import { MYVariantsResponsive } from "@/types/animation";
import { Variant } from "framer-motion";
const hidden: Variant = {
	opacity: 0,
	x: "-100vw",
	y: "calc(50vh - 50%)",
};
export const GenreBar: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step9: {
		opacity: 1,
		x: "calc(70vw - 75%)",
		y: "calc(50vh - 50%)",
		transition: {
			duration: 0.7,
			type: "spring",
			bounce: 0.2,
		},
	},
});
