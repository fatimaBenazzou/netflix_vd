import { createSlice } from "@reduxjs/toolkit";

const initial_state: TooltipI = {
	display: false,
	html: "",
	position: {
		x: 0,
		y: 0,
	},
};

const user = createSlice({
	name: "tooltip",
	initialState: initial_state,
	reducers: {
		setHTML: (state, action: { payload: TooltipI["html"] }) => {
			state.html = action.payload || "";
			return state;
		},
		setPosition: (state, action: { payload: TooltipI["position"] }) => {
			state.position = action.payload || { x: 0, y: 0 };
			return state;
		},
		showTooltip: (state) => {
			state.display = true;
			return state;
		},
		hideTooltip: (state) => {
			state.display = false;
			return state;
		},
		setTooltip: (state, action: { payload: TooltipI }) => {
			state = action.payload;
			return state;
		},
	},
});

export const { hideTooltip, setHTML, setPosition, setTooltip, showTooltip } = user.actions;

export default user.reducer;
