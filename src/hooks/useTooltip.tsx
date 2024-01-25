import { setTooltip, hideTooltip, showTooltip, setHTML, setPosition } from "@/app/context/tooltip";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useTooltip() {
	const dispatch = useAppDispatch();
	return {
		toolTip: useAppSelector((state) => state.tooltip),
		setTooltip: (toolTip: TooltipI) => {
			dispatch(setTooltip(toolTip));
		},
		hideTooltip: () => {
			dispatch(hideTooltip());
		},
		showTooltip: () => {
			dispatch(showTooltip());
		},
		setHTML: (html: string) => {
			dispatch(setHTML(html));
		},
		setPosition: (position: TooltipI["position"]) => {
			dispatch(setPosition(position));
		},
	};
}
