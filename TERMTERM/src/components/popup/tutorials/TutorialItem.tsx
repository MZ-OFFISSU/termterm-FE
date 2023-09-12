import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

interface Props {
  content: string;
  img: ImageSourcePropType;
  subContent?: string;
}

const TutorialItem = ({ content, img, subContent }: Props) => {
  const contents = content.split("/b");
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <Content Color={COLOR}>
        {contents.map((content, idx) =>
          contents.length > 2 ? (
            idx === 1 ? (
              <ContentHighlight>{content}</ContentHighlight>
            ) : (
              <Content Color={COLOR}>{content}</Content>
            )
          ) : idx === 0 ? (
            <ContentHighlight>{content}</ContentHighlight>
          ) : (
            <Content Color={COLOR}>{content}</Content>
          )
        )}
      </Content>
      <AutoSizedImage source={img} width={173} />
      {subContent && <SubContent Color={COLOR}>{subContent}</SubContent>}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Content = styled.Text<{ Color: colorTheme }>`
  ${TYPO_STYLE.Body[2].Regular};
  color: ${(props) => props.Color.Text.active};
  text-align: center;
  white-space: pre-line;
  line-height: 24px;
`;

const ContentHighlight = styled.Text`
  ${TYPO_STYLE.Body[2].Bold};
`;

const SubContent = styled.Text<{ Color: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.Color.Text.muted};
  text-align: center;
`;

export default TutorialItem;
