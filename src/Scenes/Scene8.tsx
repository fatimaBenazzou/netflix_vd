import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import { SceneComponent } from "@/types/animation";
import { Scene8_MapContainer, Scene8_MapText, Scene8_Title } from "@/variants";
import { ChoroplethMap } from "@/Components/Charts/ChoroplethMap";
import { ArrowDown2, Global } from "iconsax-react";
import { useState } from "react";

// Définir la taille ici
const MapSize = {
	width: 900,
	height: 550,
};
const MapData: MapDataI[] = [
	{
		title: "Programmes par année de sortie	",
		description: `Pour en savoir plus sur la diversité du contenu, nous avons fourni une carte choroplèthe illustrant le nombre de programmes par année. Plus la couleur est foncée, plus il y a eu de programmes diffusés cette année-là dans ce pays.`,
		url: "/data-set-treatment/enums/countries-per-release-year.json",
	},
	{
		title: "Programmes par année d'ajout",
		description: `Pour en savoir plus sur la diversité du contenu, nous avons inclus une carte choroplèthe indiquant le nombre de programmes par année. Plus la couleur est foncée, plus il y a eu d'ajouts de programmes cette année-là dans ce pays.`,
		url: "/data-set-treatment/enums/countries-per-date-added.json",
	},
];
const Scene8: SceneComponent = ({ currentVariantName, size }) => {
	const [currentMap, setCurrentMap] = useState(0);
	return (
		<>
			<AnimatedComponent
				variants={Scene8_Title(size)}
				animate={currentVariantName}
				className="text-8xl text-center text-white fixed flex items-center gap-8"
			>
				<Global variant="Bulk" size={84} className="text-primary-500 mb-2" />
				Programmes par Pays
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene8_MapContainer(size)}
				animate={currentVariantName}
				className="text-3xl fixed flex flex-col items-center text-justify text-white bottom-0"
			>
				<ChoroplethMap width={MapSize.width} height={MapSize.height} data_url={MapData[currentMap].url} />
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene8_MapText(size)}
				animate={currentVariantName}
				className="text-3xl fixed flex flex-col items-center text-justify text-white bottom-0 right-0 gap-8"
			>
				<details className="dropdown">
					<summary className="m-1 btn text-white font-[Poppins] text-xl">
						{MapData[currentMap].title} <ArrowDown2 className="" />
					</summary>
					<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box max-w-full text-lg font-[Poppins] ">
						{MapData.map((elm, i) => (
							<li onClick={() => setCurrentMap(i)} key={i}>
								<a>{elm.title}</a>
							</li>
						))}
					</ul>
				</details>
				<p className="max-w-96 font-[Poppins] text-justify text-sm">{MapData[currentMap].description}</p>
				<p className="max-w-96 font-[Poppins] text-justify text-sm">
					La légende suivante indique le nombre d'émissions par année :
				</p>
				<ul className="font-[Poppins] text-sm text-left">
					<li className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary-700 rounded-full"></div>
						<span>Plus de 500 programmes</span>
					</li>
					<li className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary-500 rounded-full"></div>
						<span>Entre 100 et 500 programmes</span>
					</li>
					<li className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary-400 rounded-full"></div>
						<span>Entre 50 et 100 programmes</span>
					</li>
					<li className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary-300 rounded-full"></div>
						<span>Entre 10 et 50 programmes</span>
					</li>
					<li className="flex items-center gap-2">
						<div className="w-4 h-4 bg-primary-200 rounded-full"></div>
						<span>Moins de 10 programmes</span>
					</li>
				</ul>
			</AnimatedComponent>
		</>
	);
};
export default Scene8;
