import styled from "styled-components/native";
import { TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { Ionicons } from "@expo/vector-icons";
import { BookmarkButton } from "@components/common/Bookmark";
import { MoreRecommendedCuration } from "Curation";
import { ViewProps } from "react-native";

interface Props extends ViewProps {
  item: MoreRecommendedCuration;
  onMove: (id: number) => void;
  img: string;
}

const CurationItem = ({ item, onMove, ...props }: Props) => {
  const { curationId, title, thumbnail, cnt, bookmarked } = item;
  const [COLOR, mode] = useThemeStyle();
  return (
    <ItemContainer {...props}>
      <CurationTitle COLOR={COLOR}>{title}</CurationTitle>
      <CurationThumbnail onPress={() => onMove(curationId)}>
        <CurationImage source={{ uri: thumbnail }} />
        <WordsNum>용어 {cnt}개</WordsNum>
        <BookmarkButton>
          {bookmarked ? (
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
  ${TYPO_STYLE.Body[2].Medium};
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
  ${TYPO_STYLE.Caption[1].Medium};
  color: white;
`;

export default CurationItem;
