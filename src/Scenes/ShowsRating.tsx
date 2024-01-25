import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import { SceneProps } from "@/types/animation";
import { useEffect, useState } from "react";
import { Scene7_Ratings } from "@/variants";
import BarChart from "@/Components/GraphicalComponents/BarChart";
import Ratings_enums from "@/Data/ratings";
import useSlider from "@/hooks/useSlider";

//import MovieRatingBarChart from "@/Components/Charts/MovieRatingBarChart";
export function ShowsRating({
	allData,
	currentVariantName,
	size,
}: { allData: NetflixData[] } & Omit<SceneProps, "currentStep" | "setCurrentNumberStep" | "pushHistory">) {
	const [ratings, setRatings] = useState<BarDataI["values"]>([]);
	const { Slider, Toggler, year, disabled } = useSlider({
		initYear: 2019,
		initYearsRange: {
			min_year: 2008,
			max_year: 2021,
		},
	});
	useEffect(() => {
		setRatings(
			Ratings_enums.map(
				(elm): BarValuesI => ({
					label: elm.toString(),
					values: [
						{
							value: allData.filter(
								(movie) => movie.rating === elm && movie.type === "Movie" && (disabled ? true : movie.release_year === year)
							).length,
							label: "Movie",
							barColor: "#E50914",
						},
						{
							value: allData.filter(
								(movie) =>
									movie.rating === elm && movie.type === "TV Show" && (disabled ? true : movie.release_year === year)
							).length,
							label: "TV Show",
							barColor: "#221f1f",
						},
					],
				})
			)
		);
	}, [allData, disabled, year]);
	return (
		<AnimatedComponent
			variants={Scene7_Ratings(size)}
			animate={currentVariantName}
			className="fixed items-center flex flex-col gap-4 right-0"
		>
			<div className="flex justify-between w-full items-center">
				<h1 className="text-4xl text-white flex items-center">Notations des Programmes</h1>
				<Toggler className="mb-2" />
			</div>
			<p className="text-white font-[Poppins] text-xs max-w-[600px] text-center">
				Netflix propose une gamme diversifiée de contenus, des séries télévisées aux films, et chacun de ces contenus est associé
				d'une notation d'age. Le graphique suivant, qui est un diagramme à barres groupées, présente le nombre de films et de séries
				télévisées pour chaque notation d'age.
			</p>
			<Slider key={"slider-rating"} className="w-full" />

			<BarChart
				data={{
					values: ratings,
					legends: [
						{
							label: "Movie",
							color: "#E50914",
						},
						{
							label: "TV Show",
							color: "#221f1f",
						},
					],
					width: 600,
					height: 400,
					defaultBarColor: "#E50914",
					legendRotation: 180,
					legendPosition: {
						x: 600 - 50,
						y: 400 - 50,
					},
				}}
				direction="vertical"
				SVGprops={{
					className: `rotate-180 ${currentVariantName === "step7" ? "animatedRect" : ""}`,
				}}
			/>
		</AnimatedComponent>
	);
}
