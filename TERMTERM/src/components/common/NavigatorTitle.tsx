import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";

/**
 * 헤더에 들어가는 타이틀
 */
export const NavigatorTitle = styled.Text`
  ${TYPO_STYLE.Body[2].SemiBold};
`;

/**
 * 헤더에 들어가는 현황 수
 */
export const NavigatorPager = styled.Text<{ COLOR: colorTheme }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.COLOR.Text.active};
`;

/**
 * 헤더에 들어가는 카렛버튼
 */
export const CaretBtn = styled.TouchableOpacity`
  position: relative;
  width: 24px;
  height: 24px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
