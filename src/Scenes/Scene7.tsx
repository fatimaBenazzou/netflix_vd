import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
//import AnimatedImage from "@/Components/AnimatedImage";
//import AnimatedTyping from "@/Components/AnimatedTyping";
import { SceneComponent } from "@/types/animation";
//import BarChart from "@/Components/GraphicalComponents/BarChart";
// import StackedChart /* , { BarDataI } */ from "@/Components/GraphicalComponents/StackedChart";
import { useEffect, useState } from "react";
import { Scene7_Comparison, Scene7_Details, Scene7_Hosted, Scene7_Title } from "@/variants";
import { ArchiveBook } from "iconsax-react";
/* import AnimatedTyping from "@/Components/AnimatedComponents/AnimatedTyping";
import PieChart , { PieDataI } from "@/Components/GraphicalComponents/PieChart"; */
import BarChart from "@/Components/GraphicalComponents/BarChart";
import PieChart from "@/Components/GraphicalComponents/PieChart";
import { ShowsRating } from "./ShowsRating";
const Scene7: SceneComponent = function ({ currentVariantName, /* setCurrentNumberStep, currentStep, pushHistory, */ size }) {
	const [comparison, setComparison] = useState<PieDataI["values"]>([]);
	const [allData, setAllData] = useState<NetflixData[]>([]);
	const [hosted, setHosted] = useState<BarDataI["values"]>([]);

	useEffect(() => {
		Promise.all([
			fetch("/data-set-treatment/enums/hosted-actors.json").then((res) => res.json() as Promise<string[]>),
			fetch("/data-set-treatment/enums/hosted-directors.json").then((res) => res.json() as Promise<string[]>),
		]).then(([actors, directors]) => {
			setHosted([
				{
					label: "Actors",
					values: [{ value: actors.length }],
				},
				{
					label: "Directors",
					values: [{ value: directors.length }],
				},
			]);
		});
		Promise.all([fetch("/data-set-treatment/filtered/filtered-all.json").then((res) => res.json() as Promise<NetflixData[]>)]).then(
			([res]) => {
				// get the keys of Netflix_Ratings
				setAllData(res);
			}
		);
	}, []);
	useEffect(() => {
		setComparison([
			{
				label: "Movie",
				value: allData.filter((movie) => movie.type === "Movie").length,
				pieColor: "#E50914",
			},
			{
				label: "TV Show",
				value: allData.filter((movie) => movie.type === "TV Show").length,
				pieColor: "#221f1f",
			},
		]);
	}, [allData]);

	// fetch data from google.com without reloading on every render

	return (
		<>
			<AnimatedComponent
				variants={Scene7_Title(size)}
				animate={currentVariantName}
				className="text-8xl text-center text-white fixed flex items-center gap-8"
			>
				<ArchiveBook variant="Bulk" size="96" className="text-primary-500 mb-2" />
				Détails du Catalogue Netflix
			</AnimatedComponent>
			<ShowsRating allData={allData} currentVariantName={currentVariantName} size={size} />
			<AnimatedComponent variants={Scene7_Comparison(size)} animate={currentVariantName} className="fixed items-center flex flex-col">
				<h1 className="text-4xl text-white flex items-center text-center mx-auto">Diversité des Programmes</h1>
				<p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
					Netflix offre une vaste gamme de contenus, englobant à la fois des séries télévisées et des films. Le Diagramme
					circulaire suivant illustre la comparaison entre le nombre de films et le nombre de séries télévisées disponibles.
				</p>
				<PieChart
					data={{
						values: comparison,
						size: 300,
					}}
					SVGprops={{
						className: `${currentVariantName === "step7" ? "animatedRect" : ""}`,
					}}
				/>
			</AnimatedComponent>
			<AnimatedComponent variants={Scene7_Hosted(size)} animate={currentVariantName} className="fixed items-center flex flex-col">
				<h1 className="text-4xl text-white flex items-center text-center mx-auto">Talents Hébergés</h1>
				<p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
					Netflix a accueilli une variété de talents, des acteurs aux réalisateurs. Le graphique ci-dessous illustre le nombre
					d'acteurs et le nombre de réalisateurs.
				</p>
				<BarChart
					data={{
						values: hosted,
						barSize: 15,
						width: 300,
						defaultBarColor: "#E50914",
					}}
					SVGprops={{
						className: ` ${currentVariantName === "step7" ? "animatedRect" : ""} `,
					}}
				/>
			</AnimatedComponent>
			<AnimatedComponent variants={Scene7_Details(size)} animate={currentVariantName} className="fixed items-center flex flex-col">
				<p className="text-white font-[Poppins] text-sm max-w-96 text-justify mb-8">
					Pour explorer les données fournies par <span className="text-primary-500">Netflix</span>, nous avons entrepris une
					analyse approfondie des détails globaux de leur catalogue de contenus. Les graphiques suivants présentent une synthèse
					complète de notre étude des données.
				</p>
			</AnimatedComponent>
		</>
	);
};
export default Scene7;
