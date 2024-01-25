import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { mapData } from "@/Data/mapData";
import useTooltip from "@/hooks/useTooltip";
import useSlider from "@/hooks/useSlider";

type MapProps = {
	width: number;
	height: number;
	data_url: string;
};
function CountryNameMap(elm: string) {
	switch (elm) {
		case "USA":
			return "United States";
		case "England":
			return "United Kingdom";
		case "West Bank":
			return "Palestine";
		case "Israel":
			return "Palestine";
		default:
			return elm;
	}
}
export const ChoroplethMap: React.FC<MapProps> = ({ width, height, data_url }) => {
	const [countriesData, setCountriesData] = useState<{ name: string; programCount: number }[]>([]);
	// Ajoutez un état pour suivre la région survolée
	const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
	const [fetchedData, setFetchedData] = useState<Record<string, Record<string, number>>>({});
	const ref = useRef<SVGSVGElement>(null);
	const { hideTooltip, setTooltip } = useTooltip();
	const { Slider, Toggler, disabled, year, setYearsRange } = useSlider({ initYear: 2019 });

	useEffect(() => {
		// Fetch la dataset Netflix-Titles
		fetch(data_url)
			.then((res) => res.json())
			.then((data: Record<string, Record<string, number>>) => {
				setFetchedData(data);
			});
	}, [data_url]);
	useEffect(() => {
		if (disabled) {
			// merge all years in fetchedData
			const mergedData: Record<string, number> = {};
			Object.keys(fetchedData).forEach((year) => {
				Object.keys(fetchedData[year]).forEach((country) => {
					mergedData[country] = (mergedData[country] || 0) + (fetchedData[year][country] || 0);
				});
			});
			setCountriesData(
				mapData.features.map((feature) => ({
					name: feature.properties?.name || "",
					programCount: mergedData[CountryNameMap(feature.properties?.name || "")] || 0,
				}))
			);
		} else {
			const d = fetchedData[year];
			if (!d) return;
			setCountriesData(
				mapData.features.map((feature) => ({
					name: feature.properties?.name || "",
					programCount: d[CountryNameMap(feature.properties?.name || "")] || 0,
				}))
			);
		}
	}, [fetchedData, year, disabled]);
	useEffect(() => {
		const years = Object.keys(fetchedData)
			.map((el) => Number(el))
			.sort();
		setYearsRange({ min_year: years[0] || 0, max_year: years[years.length - 1] || 0 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedData]);

	// Utiliser le schéma de couleurs Reds de D3 pour une échelle de couleurs
	const colorScale = d3.scaleThreshold<number, string>().domain([1, 10, 50, 100, 500, 1000, 5000]).range(d3.schemeReds[8]);

	// Utiliser une échelle de projection géométrique Mercator
	const projection = d3
		.geoMercator()
		.scale(width / (2 * Math.PI) - 20)
		.center([10, 55]);

	// Générateur de chemin géographique
	const geoPathGenerator = d3.geoPath().projection(projection);

	// Créez une fonction showTooltip qui sera appelée lors du survol d'une région
	const showTooltip = (event: React.MouseEvent<SVGPathElement, MouseEvent>, countryData: { name: string; programCount: number }) => {
		// setTooltipInfo(countryData);
		// console.log(tooltipInfo);
		setTooltip({
			html: `
			<strong>${countryData.name}</strong>
			<br/>
			Nombre de programmes : ${countryData.programCount}
			`,
			position: { x: event.clientX, y: event.clientY },
			display: true,
		});
	};

	// Mapper chaque entité géographique à un élément <path>
	const allSvgPaths = mapData.features
		.filter((shape) => shape.id !== "ATA") // Filtre l'entité antarctique
		.map((shape) => {
			const countryData = countriesData.find((country) => country.name === shape.properties?.name);
			const isHovered = countryData && countryData.name === hoveredRegion;

			const color = isHovered ? "#E50914" : countryData ? colorScale(countryData.programCount) : "lightgrey";

			return (
				<path
					key={shape.id}
					d={geoPathGenerator(shape) || "M0,0"} // Fallback à une position inconnue si le chemin est indéfini
					stroke="lightGrey"
					strokeWidth={0.5}
					fill={color}
					fillOpacity={1}
					// Ajoutez les gestionnaires d'événements pour le survol
					onMouseEnter={(event) => {
						const countryData = countriesData.find((country) => country.name === shape.properties?.name);
						if (countryData) {
							showTooltip(event, countryData);
							setHoveredRegion(countryData.name);
						}
						d3.select(event.currentTarget).transition().duration(300).attr("transform", "scale(1.1)");
					}}
					onMouseLeave={(event) => {
						hideTooltip();
						setHoveredRegion(null);
						d3.select(event.currentTarget).transition().duration(300).attr("transform", "scale(1)");
					}}
				/>
			);
		});

	return (
		<>
			<div className="flex justify-between w-full">
				<h1 className="text-4xl text-center">Année : {disabled ? "All" : year}</h1>
				<div className="flex items-center gap-4">
					<p>Toutes les années</p>
					<Toggler />
				</div>
			</div>
			<svg width={width} height={height} ref={ref} viewBox={`0 0 ${width} ${height}`}>
				{allSvgPaths}
			</svg>
			{/* slide to change year */}

			<Slider className="w-full" textSize="text-lg" />
		</>
	);
};
