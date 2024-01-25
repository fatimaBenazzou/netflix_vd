import useTooltip from "@/hooks/useTooltip";
import "./style.css";
export default function Tooltip() {
	const { toolTip } = useTooltip();
	return (
		<div
			className={`tooltip transition-opacity ${toolTip.display ? "opacity-100" : "opacity-0"}`}
			style={{
				transform: `translate(${toolTip.position.x}px, ${toolTip.position.y}px)`,
			}}
			// html
			dangerouslySetInnerHTML={{ __html: toolTip.html }}
		></div>
	);
}
