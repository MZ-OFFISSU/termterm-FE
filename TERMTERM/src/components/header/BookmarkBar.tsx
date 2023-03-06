import HeaderWrapper from "./HeaderWrapper";
import { NavigatorTitle, CaretBtn } from "../common/NavigatorTitle";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props {
  onBack: () => void;
  onBookmark: () => void;
  onShare: () => void;
  title?: string;
  bookmarked: boolean;
}

/**
 * 북마크 아이콘이 있는 헤더
 */
const BookmarkBar = ({
  onBack,
  onBookmark,
  onShare,
  title,
  bookmarked,
}: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <ElementWrapper style={{ marginLeft: 20 }}>
        <CaretBtn onPress={() => onBack()}>
          <AntDesign name="left" size={24} color={COLOR.Text.active} />
        </CaretBtn>
        {title ? (
          <NavigatorTitle style={{ marginLeft: 10 }}>{title}</NavigatorTitle>
        ) : null}
      </ElementWrapper>
      <ElementWrapper style={{ marginRight: 20 }}>
        <CaretBtn onPress={() => onBookmark()} style={{ marginRight: 20 }}>
          {bookmarked ? (
            <Ionicons
              name="md-bookmark"
              size={24}
              color={COLOR.THEME.secondary[130]}
            />
          ) : (
            <Ionicons
              name="ios-bookmark-outline"
              size={24}
              color={COLOR.Text.active}
            />
          )}
        </CaretBtn>
        <CaretBtn onPress={() => onShare()}>
          <Ionicons
            name="share-social-outline"
            size={24}
            color={COLOR.Text.active}
          />
        </CaretBtn>
      </ElementWrapper>
    </HeaderWrapper>
  );
};

const ElementWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default BookmarkBar;
