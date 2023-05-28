import { TEXT_STYLES } from "@style/designSystem";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props {
  thumbnail: string;
  title: string;
  subtitle: string;
  termCnt: number;
}

const TitleBox = ({ thumbnail, title, subtitle, termCnt }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <Thumbnail source={{ uri: thumbnail }} />
      <InfoWrapper>
        <Title COLOR={COLOR}>{title}</Title>
        <Count COLOR={COLOR}>용어 {termCnt}개</Count>
        <Subtitle COLOR={COLOR}>{subtitle}</Subtitle>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Thumbnail = styled.ImageBackground`
  width: 100%;
  height: 115px;
`;

const InfoWrapper = styled.View`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.lg.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.lg.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;

const Count = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Md?.fontSize}rem;
  font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}rem;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
  text-align: center;
  white-space: pre-line;
  margin-top: -20px;
`;

export default TitleBox;
