import { MYVariantsResponsive } from "@/types/animation";
const hidden = {
	opacity: 0,
	x: "calc(50vw - 50%)",
	y: "calc(50vh - 50%)",
	scale: 0.5,
	transition: {
		duration: 0.7,
		type: "spring",
		bounce: 0.2,
	},
	transitionEnd: {
		display: "none",
	},
};
export const Title: MYVariantsResponsive = () => ({
	hidden,
	exit: hidden,
	initial: hidden,
	step6: {
		opacity: 1,
		display: "flex",
		x: "calc(50vw - 50%)",
		y: "calc(50vh - 50%)",
		scale: 1,
		z: 100,

		transition: {
			duration: 0.7,
			type: "spring",
			bounce: 0.6,
		},
	},
});
