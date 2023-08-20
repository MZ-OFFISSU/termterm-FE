import styled from "styled-components/native";
import OverlayWithHole from "./OverlayWithHole";
import { screenHeight, screenWidth } from "@style/dimensions";
import { CoachType } from "@hooks/useCoach";
import Fold from "./Fold";
import Slide from "./Slide";
import Comment from "./Comment";
import { useCallback } from "react";

interface Props {
  type: CoachType;
}

const CoachBackground = ({ type }: Props) => {
  const holes: any = {
    folder: {
      holeCenter: { x: screenWidth - 70, y: 35 },
      radius: 50,
    },
    collapse: {
      holeCenter: { x: screenWidth - 70, y: 35 },
      radius: 50,
    },
    comment: {
      holeCenter: { x: screenWidth / 2, y: screenHeight },
      radius: 200,
    },
  };

  const Children = useCallback(() => {
    switch (type) {
      case "slide":
        return <Slide />;
      case "folder":
      case "collapse":
        return <Fold collapse={type === "folder" ? true : false} />;
      case "comment":
        return <Comment />;
      default:
        return <></>;
    }
  }, [type]);

  return (
    <Background>
      <OverlayWithHole {...holes[type]} />
      <ObjetWrapper>
        <Children />
      </ObjetWrapper>
    </Background>
  );
};

const Background = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ObjetWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CoachBackground;
