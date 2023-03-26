import styled from "styled-components/native";
import { ContentsHeader, ContentsWrapper } from "@components/search";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props {
  tags: Array<string>;
}

const RelatedTags = ({ tags }: Props) => {
  const [COLOR] = useThemeStyle();

  return (
    <ContentsWrapper
      style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 55 }}
    >
      <ContentsHeader title={"연관 태그"} />
      <TagWrapper>
        {tags.map((tag) => (
          <Tag
            COLOR={COLOR}
            key={tag}
            style={{ borderWidth: 1, borderColor: COLOR.Neutral[20] }}
          >
            <TagContent COLOR={COLOR}>{tag}</TagContent>
          </Tag>
        ))}
      </TagWrapper>
    </ContentsWrapper>
  );
};

const TagWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Tag = styled.View<{ COLOR: colorTheme }>`
  height: 48px;
  padding: 0px 22px;
  border-radius: 100px;
  background-color: ${(props) => props.COLOR.Background.input};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;

const TagContent = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.darken};
`;

export default RelatedTags;