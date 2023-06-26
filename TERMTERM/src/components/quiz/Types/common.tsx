import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";

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
  ${TYPO_STYLE.Body[2].Medium};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;
