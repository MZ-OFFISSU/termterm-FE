import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { PointHistoryContent } from "Point";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  history: PointHistoryContent;
}

const HistoryBox = ({ history, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container {...props}>
      <DateText COLOR={COLOR}>{history.date}</DateText>
      {history.dailyHistories.map((content, idx) => (
        <ContentLine key={`${idx}`}>
          <ContentText COLOR={COLOR}>
            {content.detail}
            {content.subText && (
              <>
                {"\n"}
                <SubText COLOR={COLOR}>{content.subText}</SubText>
              </>
            )}
          </ContentText>
          <ContentText COLOR={COLOR}>
            <PointText COLOR={COLOR} style={{ fontWeight: `700` }}>
              {Number(content.point) > 0 ? content.point : content.point}
            </PointText>{" "}
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

const SubText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.muted};
  margin-top: 10px;
`;

const PointText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.default};
`;

export default HistoryBox;
