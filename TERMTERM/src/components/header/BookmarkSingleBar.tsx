import HeaderWrapper from "./HeaderWrapper";
import { NavigatorTitle, CaretBtn } from "../common/NavigatorTitle";
import styled from "styled-components/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props {
  onBack: () => void;
  onBookmark: () => void;
  title?: string;
  bookmarked: boolean;
}

/**
 * 북마크 아이콘만 있는 헤더
 */
const BookmarkSingleBar = ({
  onBack,
  onBookmark,
  title,
  bookmarked,
}: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <ElementWrapper style={{ marginLeft: 20 }}>
        <CaretBtn onPress={() => onBack()}>
          <AntDesign name="left" size={24} color={COLOR.Text.active} />
        </CaretBtn>
        {title ? (
          <NavigatorTitle COLOR={COLOR} style={{ marginLeft: 100 }}>
            {title}
          </NavigatorTitle>
        ) : null}
      </ElementWrapper>
      <ElementWrapper style={{ marginRight: 20 }}>
        <CaretBtn onPress={() => onBookmark()}>
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
      </ElementWrapper>
    </HeaderWrapper>
  );
};

const ElementWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default BookmarkSingleBar;
