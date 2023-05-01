import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import WordCardCarousel from "@components/terms/WordCardCarousel";

/**
 * 단일 용어 설명 페이지
 */
const TermDetail = () => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR}>
      <WordCardCarousel />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default TermDetail;
