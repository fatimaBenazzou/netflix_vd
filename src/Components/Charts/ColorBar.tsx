import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface ColorBarProps {
  colorScale: d3.ScaleThreshold<number, string>;
  width: number;
  height: number;
}

const ColorBar: React.FC<ColorBarProps> = ({ colorScale, width, height }) => {
  const gradientRef = useRef<SVGLinearGradientElement | null>(null);

  useEffect(() => {
    // Sélectionnez le dégradé de couleurs dans le référentiel
    const gradient = d3.select(gradientRef.current);

    // Supprimez les anciens arrêts
    gradient.selectAll('*').remove();

    // Obtenez la plage de couleurs du colorScale
    const colorRange = colorScale.range();

    // Créez une échelle linéaire pour le dégradé
    const gradientScale = d3.scaleLinear<string>()
      .domain([0, 1])
      .range(colorRange);

    // Créez une plage de couleurs pour le dégradé
    const gradientColors = d3.range(0, 1.01, 0.01).map(gradientScale);

    // Ajoutez les nouveaux arrêts au dégradé
    gradientColors.forEach((color, index) => {
      gradient
        .append('stop')
        .attr('offset', `${(index / gradientColors.length) * 100}%`)
        .attr('stop-color', color);
    });
  }, [colorScale, width, height]);

  return (
    <svg width={width} height={height}>
      {/* Ajoutez un dégradé de couleur dans les définitions SVG */}
      <defs>
        <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%" ref={gradientRef} />
      </defs>
      {/* Utilisez le dégradé de couleur dans le rectangle */}
      <rect width={width} height={height} fill="url(#colorGradient)" />
    </svg>
  );
};

export default ColorBar;
