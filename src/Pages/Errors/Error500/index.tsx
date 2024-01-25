import { Link } from "react-router-dom";
import { EmojiSad, Refresh2 } from "iconsax-react";

function Error500({ backTo = "/", refetch }: { backTo?: string; refetch?: () => void }) {
	return (
		<div className="hero h-4/5">
			<div className="hero-content text-primary text-center flex-col gap-10">
				<div className="max-w-md py-40">
					<EmojiSad variant="Bulk" className="h-48 w-48 inline-block" />
					<h1 className="text-5xl  font-bold">500 - خطأ داخلي في الخادم</h1>
					{backTo && (
						<Link to={backTo} className="btn btn-primary mt-10">
							العودة إلى الصفحة الرئيسية
						</Link>
					)}
					{refetch && (
						<button
							key={"Refresh"}
							onClick={() => {
								refetch();
							}}
							className="btn btn-outline btn-primary rounded-full flex items-center justify-center mx-auto mt-10"
						>
							<Refresh2 className="w-4 h-4" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Error500;
