import { useThemeStyle } from "@hooks/useThemeStyle";
import { PointHistory } from "@interfaces/point";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  history: PointHistory;
}

const HistoryBox = ({ history, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container {...props}>
      <DateText COLOR={COLOR}>{history.date}</DateText>
      {history.details.map((content, idx) => (
        <ContentLine key={`${idx}`}>
          <ContentText COLOR={COLOR}>{content.desc}</ContentText>
          <ContentText COLOR={COLOR}>
            <ContentText COLOR={COLOR} style={{ fontWeight: `700` }}>
              {content.amount > 0 ? `+${content.amount}` : content.amount}
            </ContentText>{" "}
            포인트
          </ContentText>
        </ContentLine>
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0px;
`;

const DateText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].Medium};
  color: ${(props) => props.COLOR.Text.default};
  align-self: flex-start;
`;

const ContentLine = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ContentText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.default};
`;

export default HistoryBox;
