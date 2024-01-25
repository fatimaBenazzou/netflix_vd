import { useState } from "react";

export default function useSlider({
	initYear = new Date().getFullYear(),
	initYearsRange = { min_year: 0, max_year: 0 },
	initDisabled = false,
}: {
	initYear?: number;
	initYearsRange?: { min_year: number; max_year: number };
	initDisabled?: boolean;
}) {
	const [year, setYear] = useState<number>(initYear);
	const [disabled, setDisabled] = useState<boolean>(initDisabled);
	const [yearsRange, setYearsRange] = useState<{ min_year: number; max_year: number }>(initYearsRange);

	return {
		setDisabled,
		year,
		setYear,
		disabled,
		setYearsRange,
		Slider: ({
			className = "",
			textSize = "text-xs",
			...props
		}: {
			textSize?: string;
		} & React.HTMLAttributes<HTMLDivElement>) => (
			<div
				className={`${className} ${textSize} flex justify-between items-center gap-4 ${
					disabled ? "opacity-0 pointer-events-none" : "opacity-100"
				}`}
				{...props}
			>
				<div className="w-full">
					<input
						type="range"
						min={yearsRange.min_year}
						max={yearsRange.max_year}
						value={year}
						onChange={(e) => setYear(parseInt(e.target.value))}
						className="range range-error"
					/>
					<div className="w-full flex justify-between px-2">
						{Array.from({ length: yearsRange.max_year - yearsRange.min_year + 1 }, (_, i) => (
							<div className="flex flex-col items-center" key={i}>
								<span>|</span>
								{yearsRange.min_year + i}
							</div>
						))}
					</div>
				</div>
			</div>
		),
		Toggler: ({ className = "mb-1" }) => (
			<input
				type="checkbox"
				className={`toggle toggle-error ${className}`}
				checked={disabled}
				onChange={(e) => setDisabled(e.target.checked)}
			/>
		),
	};
}
