declare interface NewsLetterForm {
	email: string;
	name: string;
	message: string;
}
declare type BasicVariantsKeys = "hidden" | "initial" | "whileHover" | "whileTap" | "exit";
declare type Transition$1 = Orchestration & Repeat;
declare interface TooltipI {
	html: string;
	display: boolean;
	position: {
		x: number;
		y: number;
	};
}
