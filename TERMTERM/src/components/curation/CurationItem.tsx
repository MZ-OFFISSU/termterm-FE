import { CurationItemProps } from "@interfaces/curation";
import styled from "styled-components/native";
import { TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { Ionicons } from "@expo/vector-icons";

const CurationItem = ({
  title,
  img,
  counts,
  marked,
  ...props
}: CurationItemProps) => {
  const [COLOR] = useThemeStyle();
  return (
    <ItemContainer {...props}>
      <CurationTitle COLOR={COLOR}>{title}</CurationTitle>
      <CurationThumbnail>
        <CurationImage source={{ uri: img }} />
        <WordsNum>용어 {counts}개</WordsNum>
        <BookmarkButton>
          {marked ? (
            <Ionicons
              name="ios-bookmark"
              size={22}
              color={COLOR.THEME.secondary[130]}
            />
          ) : (
            <Ionicons name="ios-bookmark-outline" size={22} color="white" />
          )}
        </BookmarkButton>
      </CurationThumbnail>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const CurationTitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const CurationThumbnail = styled.TouchableOpacity`
  width: 100%;
  height: 115px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 10px;
  position: relative;
`;

const CurationImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const WordsNum = styled.Text`
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: ${TEXT_STYLES["2xsm"].default?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].default?.fontWeight};
  color: white;
`;

const BookmarkButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff30;
`;

export default CurationItem;
