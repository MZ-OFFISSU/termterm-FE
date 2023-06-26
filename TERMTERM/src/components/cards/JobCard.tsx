import styled from "styled-components/native";
import {
  TouchableOpacityProps,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { LIGHT_COLOR_STYLE, TYPO_STYLE, } from "@style/designSystem";

interface Props extends TouchableOpacityProps {
  title: string;
  img: ImageSourcePropType;
  isFocused: boolean;
}

const JobCard = ({ title, img, isFocused, ...props }: Props) => {
  return (
    <Card {...props}>
      {isFocused ? (
        <ImageBackground
          source={img}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title style={{ color: LIGHT_COLOR_STYLE.Text.active }}>
            {title}
          </Title>
        </ImageBackground>
      ) : (
        <Title style={{ color: LIGHT_COLOR_STYLE.Text.default }}>{title}</Title>
      )}
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  width: 47%;
  height: 90px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${LIGHT_COLOR_STYLE.Background.input};
`;

const Title = styled.Text`
  ${TYPO_STYLE.Body[2].Medium};
`;

export default JobCard;
