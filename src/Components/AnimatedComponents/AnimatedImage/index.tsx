import SuspenseImage from "../../SuspenseImage";
import AnimatedComponent, { AnimatedBaseComponentProps } from "../AnimatedComponent";
export type AnimatedImageProps = AnimatedBaseComponentProps & {
	src: string;
	imageClassName?: string;
	children?: React.ReactNode;
};
export default function AnimatedImage({
	variants,
	animate,
	className,
	initial,
	whileHover,
	whileTap,
	exit,
	transition,
	src,
	imageClassName = "w-full h-full",
	onClick,
	children,
}: AnimatedImageProps) {
	return (
		<AnimatedComponent
			variants={variants}
			animate={animate in variants ? animate : "hidden"}
			transition={transition}
			initial={initial}
			whileHover={whileHover}
			whileTap={whileTap}
			exit={exit}
			onClick={onClick}
			className={className}
		>
			<SuspenseImage
				className={imageClassName}
				src={src}
				alt="random"
				style={{
					imageRendering: "auto",
				}}
			/>
			{children}
		</AnimatedComponent>
	);
}
