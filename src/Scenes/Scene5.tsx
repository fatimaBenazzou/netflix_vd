import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
//import AnimatedImage from "@/Components/AnimatedImage";
//import AnimatedTyping from "@/Components/AnimatedTyping";
import { SceneComponent } from "@/types/animation";
//import BarChart from "@/Components/GraphicalComponents/BarChart";
import StackedChart from "@/Components/GraphicalComponents/StackedChart";
import { useEffect, useState } from "react";
import {
    Scene5_DataFilters,
    Scene5_DataFiltersPie,
    Scene5_DataFiltersText,
    Scene5_DataFiltersTitle,
} from "@/variants";
import { Data } from "iconsax-react";
import AnimatedTyping from "@/Components/AnimatedComponents/AnimatedTyping";
import PieChart from "@/Components/GraphicalComponents/PieChart";

const text =
    "La dataset Netflix présentait des lacunes avec de nombreuses valeurs manquantes. Pour garantir la fiabilité de notre analyse et des visualisations, nous avons entrepris une étape cruciale : le nettoyage de la dataset. Cela a impliqué l'identification et la gestion judicieuse des valeurs manquantes, garantissant des résultats plus fiables pour nos futures explorations.";
const Scene5: SceneComponent = function ({
    currentVariantName,
    /* setCurrentNumberStep, currentStep, pushHistory, */ size,
}) {
    const [data, setData] = useState<BarDataI["values"]>([]);
    const [pie, setPie] = useState<PieDataI["values"]>([]);

    useEffect(() => {
        fetch("/data-set-treatment/data/filters.json")
            .then((res) => res.json() as Promise<FilterDataI>)
            .then((res) => {
                setData([
                    {
                        label: "Show ID",
                        values: [
                            { value: res.show_id.valid, barColor: "#221f1f" },
                            { value: res.show_id.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Type",
                        values: [
                            { value: res.type.valid, barColor: "#221f1f" },
                            { value: res.type.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Title",
                        values: [
                            { value: res.title.valid, barColor: "#221f1f" },
                            { value: res.title.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Director",
                        values: [
                            { value: res.director.valid, barColor: "#221f1f" },
                            { value: res.director.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Cast",
                        values: [
                            { value: res.cast.valid, barColor: "#221f1f" },
                            { value: res.cast.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Country",
                        values: [
                            { value: res.country.valid, barColor: "#221f1f" },
                            { value: res.country.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Date Added",
                        values: [
                            { value: res.date_added.valid, barColor: "#221f1f" },
                            { value: res.date_added.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Release Year",
                        values: [
                            { value: res.release_year.valid, barColor: "#221f1f" },
                            { value: res.release_year.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Rating",
                        values: [
                            { value: res.rating.valid, barColor: "#221f1f" },
                            { value: res.rating.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Duration",
                        values: [
                            { value: res.duration.valid, barColor: "#221f1f" },
                            { value: res.duration.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Listed In",
                        values: [
                            { value: res.listed_in.valid, barColor: "#221f1f" },
                            { value: res.listed_in.errored, barColor: "red" },
                        ],
                    },
                    {
                        label: "Description",
                        values: [
                            { value: res.description.valid, barColor: "#221f1f" },
                            { value: res.description.errored, barColor: "red" },
                        ],
                    },
                ]);
                setPie([
                    {
                        label: "Valid",
                        value: res.all.valid,
                    },
                    {
                        label: "Errored",
                        value: res.all.errored,
                        scale: 1.2,
                    },
                    {
                        label: "Corrected",
                        value: res.all.corrected,
                    },
                ]);
            });
    }, []);
    return (
        <>
            <AnimatedComponent
                variants={Scene5_DataFiltersTitle(size)}
                animate={currentVariantName}
                className="text-8xl text-center text-white fixed flex items-center gap-8"
            >
                <Data variant="Bulk" size="96" className="text-primary-500 mb-2" /> Dataset analysis
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene5_DataFilters(size)}
                animate={currentVariantName}
                className="fixed gap-8 flex flex-col items-center"
            >
                <h3 className="text-4xl text-white flex items-center text-center mx-auto">
                    Erreurs du Dataset par colonne
                </h3>
                <p className="text-center font-['Poppins'] text-white whitespace-break-spaces text-xs max-w-96">
                    Nous constatons que le Dataset comporte de nombreuses valeurs manquantes. Nous
                    avons dû les corriger afin d'obtenir un Dataset plus fiable. Ce graphique, sous
                    forme de Diagramme à barres empilées horizontal, présente le nombre de valeurs
                    valides & manquantes pour chaque colonne. La partie{" "}
                    <span className="text-primary-500">rouge</span> représente le nombre de valeurs
                    manquantes, tandis que la partie{" "}
                    <span className="text-[#221f1f] font-bold drop-shadow-2xl shadow-white">
                        grise
                    </span>{" "}
                    représente le nombre de valeurs valides.
                </p>
                <StackedChart
                    data={{
                        values: data,
                        barSize: 30,
                        width: 500,
                        defaultBarColor: "red",
                    }}
                    SVGprops={{
                        className: currentVariantName === "step5" ? "animatedRect" : "",
                    }}
                />
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene5_DataFiltersText(size)}
                animate={currentVariantName}
                className="fixed gap-8 flex flex-col w-1/4 text-center font-['Poppins'] text-white whitespace-break-spaces"
            >
                <AnimatedTyping
                    duration={0.05}
                    animate={currentVariantName === "step5" ? "visible" : "hidden"}
                    text={text}
                />
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene5_DataFiltersPie(size)}
                animate={currentVariantName}
                className="fixed gap-8 flex flex-col right-0 items-center "
            >
                <PieChart
                    data={{
                        values: pie,
                        size: 300,
                    }}
                    SVGprops={{
                        className: currentVariantName === "step4" ? "animatedRect" : "",
                    }}
                />
                <h3 className="text-4xl text-white flex items-center text-center mx-auto">
                    Resultat du traitement de la Dataset
                </h3>
                <p className="text-center font-['Poppins'] text-white whitespace-break-spaces text-xs max-w-96">
                    Ce Diagramme circulaire représente le Dataset après le processus de nettoyage.
                    La partie <span className="text-primary-500">rouge</span> indique le nombre de
                    valeurs qui étaient manquantes, la partie
                    <span className="text-[#221f1f] font-bold drop-shadow-2xl shadow-white">
                        grise
                    </span>{" "}
                    représente le nombre de valeurs valides, et la partie{" "}
                    <span className="text-[#0e9342] font-bold drop-shadow-2xl shadow-white">
                        verte
                    </span>{" "}
                    indique le nombre de valeurs qui ont été corrigées.
                </p>
            </AnimatedComponent>
        </>
    );
};
export default Scene5;
