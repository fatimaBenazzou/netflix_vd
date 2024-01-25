import { EmojiSad } from "iconsax-react";

function Error404() {
	return (
		<div className="h-4/5 bg-base-200 flex w-full items-center justify-center">
			<div className="max-w-md text-secondary text-center">
				<EmojiSad variant="Bulk" className="h-48 w-48 inline-block" />
				<h1 className="text-5xl  font-bold">404 - Not Found</h1>
			</div>
		</div>
	);
}

export default Error404;
