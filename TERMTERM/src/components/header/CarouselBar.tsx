import HeaderWrapper from "./HeaderWrapper";
import { NavigatorTitle, CaretBtn } from "../common/NavigatorTitle";
import styled from "styled-components/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useHeader } from "@hooks/useHeader";
import BackArrowIcon from "@assets/icon/BackArrowIcon";

interface Props {
  onBack: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

/**
 * 북마크 아이콘이 있는 헤더
 */
const CarouselBar = ({ onBack, onBookmark, onShare }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { headerState, bookmarkHandler } = useHeader();

  return (
    <HeaderWrapper
      style={{ justifyContent: "space-between", position: "relative" }}
    >
      <CaretBtn onPress={() => onBack()} style={{ marginLeft: 20 }}>
        <BackArrowIcon size={20} color={COLOR.Text.active} />
      </CaretBtn>
      <TitleWrapper>
        <NavigatorTitle style={{ marginLeft: 10 }} COLOR={COLOR}>{`${
          headerState.curNum + 1
        }/${headerState.maxNum}`}</NavigatorTitle>
      </TitleWrapper>
      <ElementWrapper style={{ marginRight: 20 }}>
        <CaretBtn onPress={bookmarkHandler} style={{ marginRight: 20 }}>
          {headerState.bookmarked ? (
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

const TitleWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default CarouselBar;
