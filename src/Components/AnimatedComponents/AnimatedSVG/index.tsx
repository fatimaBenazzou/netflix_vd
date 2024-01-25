import { SVGMotionProps, motion } from "framer-motion";
import { AnimatedBaseComponentProps } from "../AnimatedComponent";
import React from "react";
// with svg props
export type AnimatedSVGProps = AnimatedBaseComponentProps & {
	children?: React.ReactNode;
} & SVGMotionProps<SVGSVGElement>;

export default function AnimatedSVG({
	variants,
	animate,
	className = "fixed",
	initial = "initial",
	whileHover = "whileHover",
	whileTap = "whileTap",
	exit = "exit",
	children,
	...props
}: AnimatedSVGProps) {
	return (
		<motion.svg
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
		</motion.svg>
	);
}
