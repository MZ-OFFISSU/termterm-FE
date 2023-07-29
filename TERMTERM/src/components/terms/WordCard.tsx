import { useThemeStyle } from "@hooks/useThemeStyle";
import { useWordReg } from "@hooks/useWordReg";
import { WordProps } from "@interfaces/word";
import { TEXT_STYLES, TYPO, colorTheme, TYPO_STYLE } from "@style/designSystem";
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
    <Container
      COLOR={COLOR}
      mode={mode}
      quiz={quiz}
      activeOpacity={0.6}
      {...props}
    >
      <NameWrapper>
        {sub ? (
          <SubName COLOR={COLOR} quiz={quiz} mode={mode}>
            {sub}
          </SubName>
        ) : (
          <></>
        )}
        <MainName COLOR={COLOR} mode={mode} quiz={quiz}>
          {main}
        </MainName>
      </NameWrapper>
      <Content COLOR={COLOR} mode={mode}>
        {word.description}
      </Content>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  min-width: 358px;
  width: 100%;
  aspect-ratio: 1;
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
  justify-content: flex-start;
  padding: 36px 22px 22px 22px;
`;

const NameWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SubName = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  ${TYPO_STYLE.Caption[1].Medium};
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
  ${TYPO["2xl"].Eb};
  color: ${(props) =>
    props.mode
      ? props.COLOR.Text.active
      : props.quiz
      ? props.COLOR.THEME.secondary[160]
      : props.COLOR.THEME.primary[100]};
  text-align: center;
  margin-top: 8px;
`;

const Content = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Body[3].Regular};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  white-space: pre-line;
  //TODO : line-height 수정
  line-height: ${TEXT_STYLES.sm.Reg?.fontSize! * 1.6}px;
  margin-top: 19px;
`;

const Source = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
  quiz?: boolean;
}>`
  ${TYPO_STYLE.Caption[2].Medium};
  margin-right: auto;
  color: ${(props) =>
    props.mode
      ? props.quiz
        ? props.COLOR.THEME.secondary.variant
        : props.COLOR.THEME.primary.variant
      : props.COLOR.Neutral[10]};
`;

export default WordCard;
