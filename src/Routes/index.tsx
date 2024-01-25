import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const Error404 = lazy(() => import("@/Pages/Errors/Error404"));
const Home = lazy(() => import("@/Pages/Home"));
const Router = () => {
	return useRoutes([
		{ index: true, element: <Home /> },

		{ path: "*", element: <Error404 /> },
	]);
};
export default Router;
