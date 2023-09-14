import HeaderWrapper from "./HeaderWrapper";
import { NavigatorTitle, CaretBtn } from "../common/NavigatorTitle";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import BackArrowIcon from "@assets/icon/BackArrowIcon";
import { useBookmarkHeader } from "@hooks/useBookmarkHeader";

interface Props {
  onBack: () => void;
  onBookmark: () => void;
  onShare: () => void;
  title?: string;
  bookmarked: boolean;
  isCuration?: boolean;
}

/**
 * 북마크 아이콘이 있는 헤더
 */
const BookmarkBar = ({
  onBack,
  onBookmark,
  onShare,
  title,
  isCuration,
}: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { bookmarked, handleBookmarkState } = useBookmarkHeader();

  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <ElementWrapper style={{ marginLeft: 20 }}>
        <CaretBtn onPress={() => onBack()}>
          <BackArrowIcon size={20} color={COLOR.Text.active} />
        </CaretBtn>
        {title ? (
          <NavigatorTitle COLOR={COLOR} style={{ marginLeft: 10 }}>
            {title}
          </NavigatorTitle>
        ) : null}
      </ElementWrapper>
      <ElementWrapper style={{ marginRight: 20 }}>
        <CaretBtn
          onPress={() => handleBookmarkState(isCuration)}
          style={{ marginRight: 20 }}
        >
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
