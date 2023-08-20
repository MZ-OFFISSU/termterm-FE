import { screenHeight, screenWidth } from "@style/dimensions";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface HoleProps {
  holeCenter: {
    x: number;
    y: number;
  };
  radius: number;
}

const OverlayWithHole = ({
  holeCenter = { x: 0, y: 0 },
  radius = 0,
}: HoleProps) => {
  const circlePath = `
    M${holeCenter.x},${holeCenter.y}
    m-${radius}, 0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `;

  return (
    <Svg width={screenWidth} height={screenHeight}>
      <Path
        d={`M0,0 h${screenWidth} v${screenHeight} h-${screenWidth}Z ${circlePath}`}
        fill="rgba(0, 0, 0, 0.955)"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default OverlayWithHole;
