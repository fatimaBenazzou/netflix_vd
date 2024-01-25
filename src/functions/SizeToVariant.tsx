import { SizeI, SizeWithVariant } from "@/types/animation";

const breakpoints = {
	mobile: 640,
	tablet: 768,
	desktop: 1024,
};

export default function SizeToVariant(size: SizeI): SizeWithVariant {
	if (size.width) {
		if (size.width < breakpoints.mobile) return { variant: "mobile", ...size };
		else if (size.width < breakpoints.tablet) return { variant: "tablet", ...size };
		else return { variant: "desktop", ...size };
	} else return { variant: "desktop", ...size };
}
