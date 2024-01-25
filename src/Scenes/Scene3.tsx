import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import SuspenseImage from "@/Components/SuspenseImage";
import { SceneComponent } from "@/types/animation";
import { Scene3_IntroductionContainer } from "@/variants";
import { IntroductionTitle } from "@/variants/Scene3/IntroductionTitle";

const Scene3: SceneComponent = function ({ currentVariantName, /* currentStep, setCurrentNumberStep, */ size }) {
	return (
		<>
			<AnimatedComponent
				variants={IntroductionTitle(size)}
				animate={currentVariantName}
				className="text-8xl text-center right-0 text-white fixed flex flex-col items-center gap-8"
			>
				<SuspenseImage className="w-28 h-28" src={"/logo.svg"} alt="random" />
				Introduction
			</AnimatedComponent>
			<AnimatedComponent
				variants={Scene3_IntroductionContainer(size)}
				animate={currentVariantName}
				className="text-3xl fixed gap-8 flex flex-col text-justify w-2/5 text-white "
			>
				<h1>
					<span className="text-primary-500">Netflix Décodé :</span> Les Coulisses des Données du Streaming
				</h1>
				<p className="font-['Poppins'] text-sm">
					Bienvenue dans l'envers du décor de <span className="text-primary-500">Netflix</span>, où chaque point de données
					raconte une histoire intrigante.Plongez dans l'univers du streaming, découvrez des tendances qui façonnent le
					divertissement, explorez les facettes uniques des contenus qui ont captivé des millions de spectateurs à travers le
					monde et des secrets que les données ont à nous révéler.
				</p>

				<p className="font-['Poppins'] text-sm">
					<span className="text-lg">🎬 Objectif du Projet : </span> <br /> Notre mission est de démystifier les données Netflix à
					travers des graphiques interactifs.
				</p>
				<p className="font-['Poppins'] text-sm">
					<span className="text-lg">🎓 Apprenez des Données : </span> <br /> Chaque clic vous rapproche d'une compréhension plus
					profonde. Découvrez comment les genres se croisent, Quels pays produisent le plus de contenu, et comment Netflix les
					programmes sont classés et Noté.
				</p>
				<p className="font-['Poppins'] text-sm">
					<span className="text-lg">🌐 Le Monde de Netflix en Chiffres : </span> <br /> Derrière chaque titre se cachent des
					chiffres fascinants. Des milliers de productions, des millions de spectateurs, et une infinité de choix. Explorez ce
					vaste univers avec nous.
				</p>

				<p className="font-['Poppins'] text-sm">
					Préparez-vous à déverrouiller les secrets de Netflix, un clic à la fois. Commencez votre aventure dès maintenant !
				</p>
			</AnimatedComponent>
		</>
	);
};

export default Scene3;
