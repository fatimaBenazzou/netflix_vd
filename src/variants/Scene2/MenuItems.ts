import { MYVariantsResponsive } from "@/types/animation";
import { defaultTransition as transition } from "../defaults";
const MenuItems: MYVariantsResponsive = () => {
	const hidden = {
		opacity: 0,
	};
	return {
		hidden,
		exit: hidden,
		initial: hidden,
		step2: {
			opacity: 1,
			transition,
		},
	};
};
export { MenuItems };
