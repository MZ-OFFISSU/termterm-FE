import styled from "styled-components/native";
import { TEXT_STYLES } from "@style/designSystem";

/**
 * 헤더에 들어가는 타이틀
 */
export const NavigatorTitle = styled.Text`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
`;

/**
 * 헤더에 들어가는 현황 수
 */
export const NavigatorPager = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;

/**
 * 헤더에 들어가는 카렛버튼
 */
export const CaretBtn = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
`;
