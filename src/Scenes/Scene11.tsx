import AnimatedComponent from "@/Components/AnimatedComponents/AnimatedComponent";
import { SceneComponent } from "@/types/animation";
import { Scene11_Title, Scene11_Text, Scene11_Presenters } from "@/variants";
import { ArchiveBook } from "iconsax-react";

const Scene11: SceneComponent = ({ currentVariantName, size }) => {
    return (
        <>
            <AnimatedComponent
                variants={Scene11_Title(size)}
                animate={currentVariantName}
                className="text-8xl text-center text-white fixed flex items-center gap-8"
            >
                <ArchiveBook variant="Bulk" size={84} className="text-primary-500 mb-2" />
                Conclusion
            </AnimatedComponent>

            <AnimatedComponent
                variants={Scene11_Text(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white  "
            >
                <p className="text-white font-[Poppins] text-lg max-w-4xl mb-8 text-justify">
                    Les données de Netflix sont très intéressantes à analyser. Elles nous permettent
                    de comprendre les tendances des films et des series TV. Nous avons pu voir que
                    les films sont plus populaires que les series TV. Nous avons aussi pu voir que
                    les films durent en moyenne 100 minutes et que les series TV durent en moyenne 1
                    saison. Nous avons aussi pu voir que les films sont plus populaires que les
                    series TV. Nous avons aussi pu voir que les films durent en moyenne 100 minutes
                    et que les series TV durent en moyenne 1 saison.
                </p>
            </AnimatedComponent>
            <AnimatedComponent
                variants={Scene11_Presenters(size)}
                animate={currentVariantName}
                className="fixed flex flex-col items-center text-justify text-white "
            >
                <img src="/binomes.jpg" width={400} className="rounded-3xl" />
                <h2 className="text-3xl">
                    <span className="text-red-600">BENAZZOU Fatima </span> &{" "}
                    <span className="text-yellow-600">SAYOUD Lynda</span>
                </h2>
            </AnimatedComponent>
        </>
    );
};
export default Scene11;
