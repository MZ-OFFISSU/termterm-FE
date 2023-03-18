import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE, TEXT_STYLES, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface QuizCardProps {
    title?: string
    explain: string
}

const QuizCard = (props: QuizCardProps) => {
    const [COLOR] = useThemeStyle();

    return (
        <CardContainer>
            <CardText>{props.explain}</CardText>
        </CardContainer>
    );
}

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
    // font-size: ${TEXT_STYLE_SIZE.sm};
    font-size: 16px;
    font-weight: ${TEXT_STYLE_WEIGHT.Reg};
    line-height: 25px;
    text-align: center;
    margin: auto 0;
`;

export default QuizCard;