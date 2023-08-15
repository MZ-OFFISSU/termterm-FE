import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Ionicons } from "@expo/vector-icons";
import { divideTerm } from "@utils/termCutter";
import { useState } from "react";
import { useTerm } from "@hooks/useTerm";
import { useHaptics } from "@hooks/useHaptics";

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
  const [tempMarked, setTempMarked] = useState(marked);
  const { bookmarkTerm } = useTerm();
  const { haptic } = useHaptics();

  const handleBookmark = async () => {
    try {
      await bookmarkTerm(id);
      haptic("light");
      setTempMarked((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ResultBtn COLOR={COLOR} mode={mode} {...props}>
      <ResultTitle COLOR={COLOR}>{divideTerm(title)[0]}</ResultTitle>
      <BookmarkButton mode={mode} onPress={handleBookmark}>
        {tempMarked ? (
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
