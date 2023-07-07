import { TYPO_STYLE } from "@style/designSystem";
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
  height: 130px;
`;

const InfoWrapper = styled.View`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Heading[3].Bold};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;

const Count = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.default};
  text-align: center;
  white-space: pre-line;
  margin-top: -20px;
`;

export default TitleBox;
