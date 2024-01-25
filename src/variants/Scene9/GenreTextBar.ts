import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const hidden = {
	opacity: 0,
	x: "10%",
	y: "calc(-100vh - 120%)",
};
export const GenreTextBar: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step9: {
		opacity: 1,
		x: "10%",
		y: "calc(50vh - 120%)",
		z: 100,
		transition,
	},
});
