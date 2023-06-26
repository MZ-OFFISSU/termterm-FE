import styled from "styled-components/native";
import {
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
    <CardContainer>
      <CardText>{props.explain}</CardText>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  width: 358px;
  height: 200px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.secondary[10]};
  border-radius: 20px;
  text-align: center;
  margin: 10px auto 40px auto;
  padding: 10px;
`;

const CardText = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.darken};
  ${TYPO_STYLE.Body[2].Regular};
  line-height: 25px;
  text-align: center;
  margin: auto 0;
`;

export default QuizCard;
