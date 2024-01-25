import { Suspense } from "react";
import Fallback from "@/Components/Fallback";
import Router from "./Routes";
export default function App() {
	return (
		<Suspense fallback={<Fallback />}>
			<Router />
		</Suspense>
	);
}
