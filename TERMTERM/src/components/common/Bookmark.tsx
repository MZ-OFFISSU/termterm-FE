import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TouchableOpacityProps } from "react-native";

export const BookmarkButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 10px;
  width: 38px;
  height: 38px;
  border-radius: 500px;
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

export const BookmarkWrapper = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends TouchableOpacityProps {
  fill: boolean;
}

/**
 * 용어 부분의 그레이 백그라운드 버튼
 */
export const BookmarkButtonComponent = ({ fill, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <BookmarkWrapper
      style={{ backgroundColor: mode ? "#e2e2e279" : "#00000058" }}
      {...props}
    >
      {fill ? (
        <Ionicons
          name="ios-bookmark"
          size={22}
          color={COLOR.THEME.secondary[130]}
        />
      ) : (
        <Ionicons
          name="ios-bookmark-outline"
          size={22}
          color={mode ? "white" : "#DEE0E2"}
        />
      )}
    </BookmarkWrapper>
  );
};
