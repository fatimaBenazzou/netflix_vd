import { Variant, VariantLabels, Variants } from "framer-motion";
export type SizeI = {
	width: number | null;
	height: number | null;
};
export type SizeWithVariant = SizeI & { variant: "desktop" | "mobile" | "tablet" };

export interface GlobalVariants<T> {
	initial?: T;
	whileHover?: T;
	whileTap?: T;
	exit?: T;
}
export type BasicVariants = GlobalVariants<Variant> & { hidden: Variant };
export type BasicVariantsLabels = GlobalVariants<VariantLabels>;
export type MYVariants = BasicVariants & Variants;
export type MYVariantsResponsive = (size: SizeWithVariant) => MYVariants;
export interface SceneProps {
	currentVariantName: string;
	currentStep: number;
	setCurrentNumberStep: (step: number) => void;
	size: SizeWithVariant;
	pushHistory: (variantName: string) => void;
}
export type SceneComponent = React.FC<SceneProps>;
