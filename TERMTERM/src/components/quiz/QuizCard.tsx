import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { screenWidth } from "@style/dimensions";
import useQuizExplain from "@hooks/useQuizExplain";

interface QuizCardProps {
  title?: string;
  explain: string | undefined;
}

const QuizCard = (props: QuizCardProps) => {
  const [COLOR, mode] = useThemeStyle();
  const { hiddenExplain } = useQuizExplain(props.explain ?? "")

  return (
    <CardContainer COLOR={COLOR} mode={mode}>
      <CardText COLOR={COLOR} mode={mode}>
        {hiddenExplain}
      </CardText>
    </CardContainer>
  );
};

const CardContainer = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: ${screenWidth - 32}px;
  height: 242px;
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.THEME.secondary[10]
      : props.COLOR.Background.onSurface};
  border-radius: 10px;
  text-align: center;
  margin: 10px auto 40px auto;
  padding: 16px;
`;

const CardText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  color: ${(props) => props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  ${TYPO_STYLE.Body[3].Regular};
  padding: 0 10px;
  line-height: 25px;
  text-align: left;
  margin: auto 0;
`;

export default QuizCard;
