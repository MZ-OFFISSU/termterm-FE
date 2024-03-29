import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";

interface Props extends TouchableOpacityProps {
  title: string;
}

const Recommend = ({ title, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <RecommendBtn COLOR={COLOR} mode={mode} {...props}>
      <RecommendTitle COLOR={COLOR} mode={mode}>
        {title}
      </RecommendTitle>
    </RecommendBtn>
  );
};

const RecommendBtn = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 500px;
  border: 1px solid ${(props) => props.COLOR.THEME.primary.variant};
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.THEME.primary[10]
      : props.COLOR.Background.surface};
  margin: 0px 0px 7px 7px;
`;

const RecommendTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.active};
`;

export default Recommend;
