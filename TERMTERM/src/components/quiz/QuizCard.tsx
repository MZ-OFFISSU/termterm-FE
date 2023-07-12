import styled from "styled-components/native";
import {
  colorTheme,
  LIGHT_COLOR_STYLE,
  TYPO_STYLE,
} from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface QuizCardProps {
  title?: string;
  explain: string;
}

const QuizCard = (props: QuizCardProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <CardContainer COLOR={COLOR} mode={mode}>
      <CardText COLOR={COLOR} mode={mode}>{props.explain}</CardText>
    </CardContainer>
  );
};

const CardContainer = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 358px;
  height: 200px;
  background-color: ${(props) => props.COLOR.THEME.secondary[10]};
  border-radius: 20px;
  text-align: center;
  margin: 10px auto 40px auto;
  padding: 10px;
`;

const CardText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  color: ${(props) => props.COLOR.Text.darken};
  ${TYPO_STYLE.Body[2].Regular};
  line-height: 25px;
  text-align: center;
  margin: auto 0;
`;

export default QuizCard;
