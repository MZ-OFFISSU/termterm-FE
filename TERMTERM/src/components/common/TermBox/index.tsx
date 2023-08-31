import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Ionicons } from "@expo/vector-icons";
import { divideTerm } from "@utils/termCutter";
import { useState } from "react";
import { useTerm } from "@hooks/useTerm";
import { useHaptics } from "@hooks/useHaptics";
import { useArchive } from "@hooks/useArchive";
import CustomModal from "@components/popup/modal";

interface Props extends TouchableOpacityProps {
  id: number;
  title: string;
  marked: boolean;
}

/**
 * 검색 결과 -> 용어
 * 북마크 폴더 안 -> 용어
 */
const TermBox = ({ id, title, marked, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { archiveTerm, isModalOpen, goToFolderMake, closeModal } = useArchive();
  const { haptic } = useHaptics();

  const handleBookmark = () => {
    haptic("light");
    archiveTerm(id);
  };

  return (
    <ResultBtn COLOR={COLOR} mode={mode} {...props}>
      <ResultTitle COLOR={COLOR}>{divideTerm(title)[0]}</ResultTitle>
      <BookmarkButton mode={mode} onPress={handleBookmark}>
        {marked ? (
          <Ionicons
            name="ios-bookmark"
            size={22}
            color={COLOR.THEME.secondary[130]}
          />
        ) : (
          <Ionicons
            name="ios-bookmark-outline"
            size={22}
            color={COLOR.Neutral[20]}
          />
        )}
      </BookmarkButton>
      <CustomModal
        visible={isModalOpen}
        title={"용어 아카이빙 폴더가 없어요"}
        subtitle={
          "폴더를 만들어 용어를 아카이빙한 후\n용어 아카이브를 활용해 보세요"
        }
        btnTitle={["나중에 만들게요", "폴더 만들기"]}
        onNext={goToFolderMake}
        onClose={() => {
          closeModal();
        }}
      />
    </ResultBtn>
  );
};

const ResultBtn = styled.TouchableOpacity<{ COLOR: colorTheme; mode: boolean }>`
  min-width: 165px;
  width: 49%;
  height: 70px;
  border-radius: 10px;
  border: ${(props) =>
    props.mode ? props.COLOR.Background.inputBorderDefault : "none"};
  background-color: ${(props) => props.COLOR.Background.input};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  margin-top: 8px;
`;

const BookmarkButton = styled.TouchableOpacity<{ mode: boolean }>`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.mode ? "#e2e2e261" : "#0000003b")};
  border-radius: 100%;
`;

const ResultTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

export default TermBox;
