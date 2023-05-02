import { useThemeStyle } from "@hooks/useThemeStyle";
import { useWordReg } from "@hooks/useWordReg";
import { WordProps } from "@interfaces/word";
import { TEXT_STYLES, colorTheme } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface Props extends TouchableOpacityProps {
  word: WordProps;
  quiz?: boolean;
}

/**
 * 단어 카드
 * 전체 영역에 대한 Props 상속 받고 있음.
 * 퀴즈용 테마로 하려면 quiz props true로 주세요
 */
const WordCard = ({ word, quiz, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(word.name);

  return (
    <Container COLOR={COLOR} mode={mode} quiz={quiz} {...props}>
      <NameWrapper>
        {sub ? (
          <SubName COLOR={COLOR} quiz={quiz} mode={mode}>
            {sub}
          </SubName>
        ) : (
          <></>
        )}
        <MainName
          COLOR={COLOR}
          mode={mode}
          quiz={quiz}
          style={{ marginTop: sub ? 5 : 20 }}
        >
          {main}
        </MainName>
      </NameWrapper>
      <Content COLOR={COLOR} mode={mode}>
        {word.description}
      </Content>
      <Source COLOR={COLOR} mode={mode} quiz={quiz}>
        {word.source}
      </Source>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  width: 100%;
  height: 355px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.mode
      ? props.quiz
        ? props.COLOR.THEME.secondary[10]
        : props.COLOR.THEME.primary[10]
      : props.COLOR.Background.onSurface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const NameWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

const SubName = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  font-size: ${TEXT_STYLES["2xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].Md?.fontWeight};
  color: ${(props) =>
    props.mode
      ? props.quiz
        ? props.COLOR.THEME.secondary[160]
        : props.COLOR.THEME.primary[160]
      : "#929292"};
  text-align: center;
`;

const MainName = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  font-size: ${TEXT_STYLES["2xl"].Eb?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xl"].Eb?.fontWeight};
  color: ${(props) =>
    props.mode
      ? props.COLOR.Text.active
      : props.quiz
      ? props.COLOR.THEME.secondary[160]
      : props.COLOR.THEME.primary[100]};
  text-align: center;
`;

const Content = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  font-size: ${TEXT_STYLES.sm.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.sm.Reg?.fontWeight};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  white-space: pre-line;
  line-height: ${TEXT_STYLES.sm.Reg?.fontSize! * 1.6}px;
`;

const Source = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
  color: ${(props) =>
    props.mode
      ? props.quiz
        ? props.COLOR.THEME.secondary.variant
        : props.COLOR.THEME.primary.variant
      : props.COLOR.Neutral[10]};
`;

export default WordCard;
