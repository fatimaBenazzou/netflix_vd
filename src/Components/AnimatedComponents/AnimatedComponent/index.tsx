import { HTMLMotionProps, motion } from "framer-motion";
import { MYVariants, BasicVariantsLabels } from "@/types/animation";
export type AnimatedBaseComponentProps = {
	variants: MYVariants;
	animate: string;
	transition?: Transition$1;
	className?: string;
	onClick?: () => void;
} & BasicVariantsLabels;

export type AnimatedComponentProps = AnimatedBaseComponentProps & HTMLMotionProps<"div">;

export default function AnimatedComponent({
	variants,
	animate,
	className = "fixed",
	initial = "initial",
	whileHover = "whileHover",
	whileTap = "whileTap",
	exit = "exit",
	children,
	...props
}: AnimatedComponentProps) {
	return (
		<motion.div
			variants={variants}
			animate={animate in variants ? animate : "hidden"}
			initial={initial}
			whileHover={whileHover}
			whileTap={whileTap}
			exit={exit}
			className={`flex ${className}`}
			{...props}
		>
			{children}
		</motion.div>
	);
}
