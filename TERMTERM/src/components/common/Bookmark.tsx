import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";

export const BookmarkButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff30;
`;

export const PreviewBookmark = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  dark: boolean;
  fill: boolean;
}

/**
 * 용어 부분의 그레이 백그라운드 버튼
 */
export const BookmarkButtonComponent = ({ fill, dark }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <BookmarkButton
      style={{ backgroundColor: dark ? "#2c2c2c7a" : "#e2e2e279" }}
    >
      {fill ? (
        <Ionicons
          name="ios-bookmark"
          size={22}
          color={COLOR.THEME.secondary[130]}
        />
      ) : (
        <Ionicons name="ios-bookmark-outline" size={22} color="white" />
      )}
    </BookmarkButton>
  );
};
