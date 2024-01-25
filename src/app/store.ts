import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//import Api from "./backend";
import tooltip from "./context/tooltip";

export const store = configureStore({
	reducer: {
		tooltip,
		//[Api.reducerPath]: Api.reducer,
	},
	//middleware: (defaultMiddleware) => defaultMiddleware().concat(Api.middleware),
});

export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
