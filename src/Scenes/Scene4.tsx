import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import SuspenseImage from "@/Components/SuspenseImage";
import { SceneComponent } from "@/types/animation";
import { Scene4_DatasetContainer, Scene4_DatasetTitle } from "@/variants";

const columns = [
	{ name: "show_id", description: "Identifiant unique attribué à chaque titre Netflix." },
	{ name: "type", description: "Indique si le titre est un film ou une émission de télévision." },
	{ name: "title", description: "Le titre du film ou de l'émission." },
	{ name: "director", description: "Le réalisateur du film ou de l'émission." },
	{ name: "cast", description: "La distribution principale de l'émission ou du film." },
	{ name: "country", description: "Pays d'origine du titre." },
	{ name: "date_added", description: "Date à laquelle le titre a été ajouté sur Netflix." },
	{ name: "release_year", description: "Année de sortie du titre." },
	{ name: "rating", description: "Classification par âge du programme." },
	{
		name: "duration",
		description: "Durée du titre (en minutes pour les films et en saisons pour les émissions de télévision)",
	},
	{ name: "listed_in", description: " Catégories dans lesquelles le titre est répertorié." },
	{ name: "description", description: "Une brève description du contenu." },
];

const Scene4: SceneComponent = function ({ currentVariantName, /* currentStep, setCurrentNumberStep, */ size }) {
	return (
		<>
			<AnimatedComponent
				variants={Scene4_DatasetTitle(size)}
				animate={currentVariantName}
				className="text-8xl text-center text-white fixed flex flex-col items-center gap-8"
			>
				<SuspenseImage className="w-50 h-32" src={"/kaggle-logo.svg"} alt="random" />
				<SuspenseImage className="w-28 h-28" src={"/logo.svg"} alt="random" />
				DataSet
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene4_DatasetContainer(size)}
				animate={currentVariantName}
				className="right-1/4 text-3xl fixed gap-8 flex flex-col text-justify w-2/5 text-white "
			>
				<h1>
					Description de <span className="text-primary-500">"Netflix Titles"</span>
				</h1>
				<p className="font-['Poppins'] text-sm">
					La dataset <span className="text-primary-500">Netflix</span>, une collection complète de données, de plus +8000 lignes,
					sur les titres disponibles sur la célèbre plateforme de streaming. Cette dataset, disponible sur{" "}
					<span className="text-cyan-400">Kaggle</span>, offre un aperçu détaillé des films et émissions de télévision
					disponibles, couvrant une variété de genres, de pays de production et d'années de sortie.
				</p>

				<h2 className="text-xl">Champs de la Dataset</h2>
				<div className="px-4 text-sm">
					<ul className="list-disc pl-8 ">
						{columns.map((column) => (
							<li key={column.name} className="font-['Poppins']">
								<span>{column.name} :</span> {column.description}
							</li>
						))}
					</ul>
				</div>
			</AnimatedComponent>
		</>
	);
};

export default Scene4;
