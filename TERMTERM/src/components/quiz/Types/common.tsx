import styled from "styled-components/native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";

export interface ChildrenProps {
  navigate: () => void;
}

export const LeftBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: 500;
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;
