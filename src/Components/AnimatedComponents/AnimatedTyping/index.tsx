import React from "react";
import { motion } from "framer-motion";
export default function AnimatedTyping({
	duration,
	text,
	delay,
	animate = "visible",
	...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
	duration?: number;
	text: string;
	delay?: number;
	animate?: "visible" | "hidden";
}) {
	return (
		<p {...props}>
			<span className="sr-only">{text}</span>
			<motion.span aria-hidden>
				{text.split("").map((char, index) =>
					char === " " ? (
						" "
					) : (
						<motion.span
							key={char + "-" + index}
							className="inline-block"
							custom={index}
							variants={{
								hidden: {
									opacity: 0,
								},
								visible: {
									opacity: 1,
									transition: {
										duration: duration ? duration : 0.1,
										delay: (delay ? delay : 0) + index * (duration ? duration / 2 : 0.1),
									},
								},
							}}
							initial="hidden"
							animate={animate}
						>
							{char}
						</motion.span>
					)
				)}
			</motion.span>
		</p>
	);
}
