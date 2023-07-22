import styled from "styled-components/native";
import {
  TouchableOpacityProps,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { LIGHT_COLOR_STYLE, TYPO_STYLE, colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props extends TouchableOpacityProps {
  title: string;
  img: ImageSourcePropType;
  isFocused: boolean;
}

const JobCard = ({ title, img, isFocused, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Card COLOR={COLOR} {...props}>
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
        <Title COLOR={COLOR}>{title}</Title>
      )}
    </Card>
  );
};

const Card = styled.TouchableOpacity<{ COLOR: colorTheme }>`
  width: 47%;
  height: 90px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) => props.COLOR.Background.input};
`;

const Title = styled.Text<{ COLOR?: colorTheme }>`
  ${TYPO_STYLE.Body[2].Medium};
  color: ${(props) => (props.COLOR ? props.COLOR.Text.default : "")};
`;

export default JobCard;
