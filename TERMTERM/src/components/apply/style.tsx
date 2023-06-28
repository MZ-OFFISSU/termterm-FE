import { LIGHT_COLOR_STYLE, TYPO_STYLE, colorTheme } from "@style/designSystem";
import styled from "styled-components/native";

export interface ApplyProps {
  nextStage: () => void;
}

export const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
`;

export const InfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

export const TitleWrapper = styled.View`
  position: relative;
`;

export const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].ExtraBold};
  color: ${(props) => props.COLOR.Text.active};
  text-align: start;
`;

export const TitleObjet = styled.View`
  position: absolute;
  width: 224px;
  height: 10px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[100]};
  left: 0px;
  bottom: 0px;
`;

export const Content = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  text-align: start;
  white-space: pre-line;
  line-height: 20px;
`;

export const ListItem = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  padding: 11px 18px;
  border-radius: 8px;
  background-color: ${(props) => props.COLOR.Background.input};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const ListText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

export const ListItemCaption = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  padding: 18px;
  border-radius: 8px;
  background-color: ${(props) => props.COLOR.Background.onSurface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ListItemCaptionText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  text-align: center;
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 12px;
`;

export const CheckBoxWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const CheckBoxContent = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-left: 5px;
`;

export const ContentBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ContentTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

export const ContentCaption = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[2].Regular};
  color: ${(props) => props.COLOR.Text.default};
`;
