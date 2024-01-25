import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import BoxAndWhiskers from "@/Components/GraphicalComponents/BoxAndWhiskers";
import useSlider from "@/hooks/useSlider";
import { SceneComponent } from "@/types/animation";
import {
    Scene10_Title,
    Scene10_Movies_BoxAndWhiskers,
    //Scene10_TV_Shows_BoxAndWhiskers,
    Scene10_TV_Shows_Text,
    Scene10_Movies_Text,
    Scene10_Year_Slider,
    Scene10_Toggler,
    Scene10_TV_Shows_BoxAndWhiskers,
} from "@/variants";
import { Clock } from "iconsax-react";
import { useEffect, useState } from "react";

const Scene10: SceneComponent = ({ currentVariantName, size }) => {
    const [data, setData] = useState<DurationDataI>({
        "TV-shows": {},
        Movies: {},
    });
    const { Slider, Toggler, year, disabled } = useSlider({
        initYear: 2020,
        initYearsRange: {
            min_year: 2008,
            max_year: 2021,
        },
    });
    const [tvShows, setTvShows] = useState<number[]>([]);
    const [movies, setMovies] = useState<number[]>([]);
    useEffect(() => {
        fetch("/data-set-treatment/enums/durations.json")
            .then((res) => res.json() as Promise<DurationDataI>)
            .then((res) => {
                setData(res);
            });
    }, []);
    useEffect(() => {
        if (!data) return;
        if (disabled) {
            setTvShows(Object.values(data["TV-shows"]).flat() || []);
            setMovies(Object.values(data.Movies).flat() || []);
        } else {
            setTvShows(data["TV-shows"][year] || []);
            setMovies(data.Movies[year] || []);
        }
    }, [data, year, disabled]);
    return (
        <>
            <AnimatedComponent
                variants={Scene10_Title(size)}
                animate={currentVariantName}
                className="text-6xl text-center text-white fixed flex items-center gap-8"
            >
                <Clock variant="Bulk" size={84} className="text-primary-500 mb-2" />
                Analyse des durées des films et des series TV
            </AnimatedComponent>

            <AnimatedComponent
                variants={Scene10_Movies_BoxAndWhiskers(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white"
            >
                <BoxAndWhiskers
                    data={{
                        label: "Movies Durations",
                        data: movies,
                        range: [0, 260],
                        height: 150,
                        width: 400,
                        suffix: "min",
                    }}
                />
                <h2 className="text-3xl text-white flex items-center gap-1 text-center mx-auto">
                    <span className="text-primary-500">Movies</span>
                    <span>Durations</span>
                </h2>
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene10_TV_Shows_BoxAndWhiskers(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white"
            >
                <BoxAndWhiskers
                    data={{
                        label: "Tv shows Durations",
                        data: tvShows,
                        range: [1, 18],
                        height: 150,
                        width: 400,
                        split: 9,
                        suffix: "season",
                    }}
                />
                <h2 className="text-3xl text-white flex items-center gap-1 text-center mx-auto">
                    <span className="text-primary-500">Tv Shows</span>
                    <span>Durations</span>
                </h2>
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene10_Movies_Text(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white "
            >
                <h1 className="text-4xl text-white flex items-center text-center mx-auto">
                    Box and Whiskers plot des durées des films
                </h1>
                <p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
                    La boite à moustache ci-dessus présente les durées des films sur Netflix. On
                    peut voir que la majorité des films ont une durée entre 47 et 127 minutes. Le
                    film le plus long est "The School of Rock" avec 260 minutes.
                </p>
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene10_TV_Shows_Text(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white "
            >
                <h1 className="text-4xl text-white flex items-center text-center mx-auto">
                    Box and Whiskers plot des saisons des series TV
                </h1>
                <p className="text-white font-[Poppins] text-xs max-w-96 text-center mb-8">
                    La boite à moustache ci-dessus présente les saisons des series TV sur Netflix.
                    On peut voir que la majorité des series TV ont entre 1 et 2 saisons. La série TV
                    avec le plus de saisons est "Grey's Anatomy" avec 17 saisons.
                </p>
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene10_Toggler(size)}
                animate={currentVariantName}
                className="fixed flex w-full max-w-2xl justify-between"
            >
                <p className="text-2xl">Every year</p>
                <Toggler className="mb-4" />
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene10_Year_Slider(size)}
                animate={currentVariantName}
                className="fixed flex w-full max-w-2xl"
            >
                <Slider className="mb-4 w-full" />
            </AnimatedComponent>
        </>
    );
};
export default Scene10;
