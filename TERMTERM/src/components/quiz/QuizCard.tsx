import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import styled from "styled-components/native";
import {
  LIGHT_COLOR_STYLE,
  TEXT_STYLES,
  TEXT_STYLE_SIZE,
  TEXT_STYLE_WEIGHT,
} from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { PreventRemoveProvider } from "@react-navigation/native";

interface QuizCardProps {
  explain: string;
  title?: string;
  quiz?: boolean;
}

const QuizCard = ({ explain, title, quiz, ...props }: QuizCardProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <CardContainer COLOR={COLOR} mode={mode} quiz={quiz} {...props}>
      <CardText COLOR={COLOR} mode={mode}>{explain}</CardText>
    </CardContainer>
  );
};

const CardContainer = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  width: ${screenWidth - 32}px;
  height: 242px;
  background-color: ${(props) =>
    props.mode
      ? props.quiz
        ? props.COLOR.THEME.secondary[10]
        : props.COLOR.THEME.primary[10]
      : props.COLOR.Background.onSurface};
  border-radius: 10px;
  text-align: center;
  margin: 10px auto 40px auto;
  padding: 0px 20px;
`;

const CardText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  color: ${(props) => 
    props.mode 
    ? props.COLOR.Text.darken 
    : props.COLOR.Text.lighten
  };
  font-size: ${TEXT_STYLE_SIZE.sm}px;
  font-weight: ${TEXT_STYLE_WEIGHT.Reg};
  line-height: 25px;
  text-align: left;
  margin: 30px 10px;
`;

export default QuizCard;
