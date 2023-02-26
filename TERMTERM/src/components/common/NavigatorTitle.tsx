import styled from "styled-components/native";
import { TEXT_STYLES } from "@style/designSystem";

export const NavigatorTitle = styled.Text`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
`;

export const NavigatorPager = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

export const CaretBtn = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
`;
