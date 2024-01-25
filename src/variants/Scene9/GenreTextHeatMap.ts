import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "100%",
	y: "calc(100vh + 120%)",
};
export const GenreTextHeatMap: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step9: {
		opacity: 1,
		x: "100%",
		y: "calc(50vh + 70%)",
		z: 100,
		transition,
	},
});
