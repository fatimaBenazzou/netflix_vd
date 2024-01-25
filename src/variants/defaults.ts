import { Variant } from "framer-motion";

const hidden: Variant = { opacity: 0, pointerEvents: "none" };
const hiddenWithPosition: Variant = { opacity: 0, x: 0, y: 0, pointerEvents: "none" };
export { hidden, hiddenWithPosition };

export const defaultTransition = (
	duration = 0.7,
	options = {
		type: "spring",
		bounce: 0,
		delayChildren: 0.3,
		staggerChildren: 0.05,
	}
) => ({
	duration,
	...options,
});
