import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import BarChart from "@/Components/GraphicalComponents/BarChart";
import CorrelationHeatMap from "@/Components/GraphicalComponents/CorrelationHeatMap";
import { SceneComponent } from "@/types/animation";
import { Scene9_GenreBar, Scene9_CorrelationHeatMap, Scene9_Title, Scene9_GenreTextBar, Scene9_GenreTextHeatMap } from "@/variants";
import { DocumentFilter } from "iconsax-react";
import { useEffect, useState } from "react";
const numberGenre = 10;
const Scene9: SceneComponent = ({ currentVariantName, size }) => {
	const [genres, setGenres] = useState<BarDataI["values"]>([]);
	const [correlation, setCorrelation] = useState<CorrelationHeatMapData["values"]>([]);
	const [data, setData] = useState<GenreDataI[]>([]);
	useEffect(() => {
		fetch("/data-set-treatment/enums/genre.json")
			.then((res) => res.json() as Promise<GenreDataI[]>)
			.then((res) => {
				setData(res);
			});
	}, []);
	useEffect(() => {
		const genres_enums: BarDataI["values"] = data.slice(0, numberGenre).map((elm, i) => ({
			label: elm.genre,
			values: [{ value: elm.count, barColor: i % 2 ? "#E50914" : "#221f1f" }],
		}));
		setGenres(genres_enums);
		const enums = genres_enums.map((elm) => elm.label);
		// generate a matrix of correlation between genres from genres_enums
		const correlationMatrix: CorrelationHeatMapData["values"] = genres_enums.map(() => genres_enums.map(() => null));
		genres_enums.forEach((elm, i) => {
			data.forEach((elm2, j) => {
				if (enums.includes(elm2.genre)) {
					if (i > j) {
						correlationMatrix[i][numberGenre - j - 1] = {
							value: elm2.correlation[elm.label as Genres] || 0,
							right: elm.label as Genres,
							bottom: elm2.genre,
						};
					} else correlationMatrix[i][numberGenre - j - 1] = null;
				}
			});
		});
		setCorrelation(correlationMatrix);
	}, [data]);
	return (
		<>
			<AnimatedComponent
				variants={Scene9_Title(size)}
				animate={currentVariantName}
				className="text-8xl text-center text-white fixed flex items-center gap-8"
			>
				<DocumentFilter variant="Bulk" size={84} className="text-primary-500 mb-2" /> Analyse des genres
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene9_GenreBar(size)}
				animate={currentVariantName}
				className="fixed flex flex-col items-center text-justify text-white "
			>
				<BarChart
					data={{
						values: genres,
						barSize: 40,
						width: 600,
						defaultBarColor: "#221f1f",
					}}
					SVGprops={{
						className: ` ${currentVariantName === "step9" ? "animatedRect" : ""} `,
					}}
				/>
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene9_CorrelationHeatMap(size)}
				animate={currentVariantName}
				className="fixed flex flex-col items-center text-justify text-white right-0"
			>
				<CorrelationHeatMap
					data={{
						values: correlation,
						labels: genres.map((elm) => elm.label || ""),
						gap: 10,
						size: 730,
						colorRange: [
							"#221F1Fff",
							"#361D1Eff",
							"#491B1Dff",
							"#5D181Cff",
							"#70161Bff",
							"#84141Aff",
							"#971218ff",
							"#AB1017ff",
							"#BE0D16ff",
							"#D20B15ff",
							"#E50914ff",
						],
					}}
					SVGprops={{
						className: ` ${currentVariantName === "step9" ? "animatedRect" : ""} text-sm`,
					}}
				/>
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene9_GenreTextBar(size)}
				animate={currentVariantName}
				className="fixed flex flex-col items-center text-justify text-white "
			>
				<h1 className="text-4xl text-white flex items-center text-center mx-auto">Genres les plus populaires</h1>
				<p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
					Le diagramme à barres horizontales á coté présente le nombre de films appartenant aux {numberGenre} genres les plus
					populaires sur Netflix. Le genre le plus populaire est "Films internationaux" avec plus de 2000 films.
				</p>
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene9_GenreTextHeatMap(size)}
				animate={currentVariantName}
				className="fixed flex flex-col items-center text-justify text-white "
			>
				<h1 className="text-4xl text-white flex items-center text-center mx-auto">Correlation entre genres</h1>
				<p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
					La carte thermique suivante montre la corrélation entre les {numberGenre} genres les plus populaires sur Netflix. La
					corrélation entre deux genres est le nombre de films qui appartiennent à ces deux genres simultanément.
				</p>
			</AnimatedComponent>
		</>
	);
};
export default Scene9;
