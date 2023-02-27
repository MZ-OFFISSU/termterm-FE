import styled from "styled-components/native";
import {
  TouchableOpacityProps,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { LIGHT_COLOR_STYLE, TEXT_STYLES } from "@style/designSystem";

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
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
`;

export default JobCard;
