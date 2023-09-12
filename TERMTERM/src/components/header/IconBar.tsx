import HeaderWrapper from "./HeaderWrapper";
import {
  NavigatorTitle,
  CaretBtn,
  TitleWrapper,
} from "../common/NavigatorTitle";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { iconHeaderState } from "@recoil/iconHeaderState";
import { useRecoilValue } from "recoil";
import { useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as Haptics from "expo-haptics";
import BackArrowIcon from "@assets/icon/BackArrowIcon";
import { useHeader } from "@hooks/useHeader";
import FolderApi from "@api/FolderApi";
import { useHaptics } from "@hooks/useHaptics";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export enum Icon {
  fold,
  collapse,
}

interface Props {
  onBack: () => void;
  icon: Icon;
  onPress: () => void;
  bookmarkBar?: boolean;
}

/**
 * 아이콘과 함수를 유동적으로 삽입할 수 있는 헤더
 */
const IconBar = ({ onBack, icon, onPress, bookmarkBar }: Props) => {
  const folderApi = new FolderApi();

  const [COLOR, mode] = useThemeStyle();
  const {
    headerState,
    bookmarkArray,
    termIdArray,
    settingBookmarkArrayByIndex,
  } = useHeader();
  const { haptic } = useHaptics();

  const onBookmark = async (folderId: number, termId: number) => {
    const isBookmarked = bookmarkArray[headerState.curNum];
    haptic("light");
    if (isBookmarked) {
      //북마크가 되어있다면?
      await folderApi.removeTermInFolder({ folderId, termId });
      settingBookmarkArrayByIndex(headerState.curNum, false);
      Toast.show({
        type: mode ? "light" : "dark",
        text1: "선택한 폴더에서\n용어 아카이빙이 해제되었어요!",
      });
    } else {
      //북마크가 취소되어있다면?
      await folderApi.registerTermInFolder([folderId], termId);
      settingBookmarkArrayByIndex(headerState.curNum, true);
      Toast.show({
        type: mode ? "light" : "dark",
        text1: "선택한 폴더에서\n용어가 다시 아카이빙 되었어요!",
      });
    }
  };

  const Fold = useCallback(() => {
    return mode ? (
      <AutoSizedImage source={require("@assets/icon/fold.png")} height={25} />
    ) : (
      <AutoSizedImage
        source={require("@assets/icon/fold-dark.png")}
        height={18}
      />
    );
  }, []);

  const Collapse = useCallback(() => {
    return mode ? (
      <AutoSizedImage
        source={require("@assets/icon/collapse.png")}
        height={24}
      />
    ) : (
      <AutoSizedImage
        source={require("@assets/icon/collapse-dark.png")}
        height={24}
      />
    );
  }, []);

  const Bookmark = () => {
    return (
      <CaretBtn
        onPress={() =>
          onBookmark(headerState.folderId, termIdArray[headerState.curNum])
        }
        style={{ marginRight: 15 }}
      >
        {bookmarkArray[headerState.curNum] ? (
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
    );
  };

  const handleShare = async (url: string) => {
    if (!(await Sharing.isAvailableAsync())) {
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Sharing.shareAsync(url);
  };

  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <CaretBtn onPress={() => onBack()} style={{ marginLeft: 20 }}>
        <BackArrowIcon size={20} color={COLOR.Text.active} />
      </CaretBtn>
      {bookmarkBar ? (
        <TitleWrapper>
          <NavigatorTitle COLOR={COLOR}>
            {`${headerState.curNum + 1}/${headerState.maxNum}`}
          </NavigatorTitle>
        </TitleWrapper>
      ) : (
        <></>
      )}
      <ElementWrapper style={{ marginRight: 20 }}>
        {bookmarkBar !== undefined && <Bookmark />}
        <CaretBtn onPress={() => onPress()} style={{ marginRight: 13 }}>
          {icon === Icon.fold ? <Fold /> : <Collapse />}
        </CaretBtn>
        <CaretBtn onPress={() => handleShare("https://www.naver.com/")}>
          <Feather name="share-2" size={20} color={COLOR.Text.active} />
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

export default IconBar;
