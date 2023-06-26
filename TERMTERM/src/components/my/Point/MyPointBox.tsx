import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import {
  colorTheme,
  LIGHT_COLOR_STYLE,
  TYPO_STYLE,
} from "@style/designSystem";
import styled from "styled-components/native";

interface Props {
  point: number;
}

const MyPointBox = ({ point }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Box COLOR={COLOR}>
      <Title>내 포인트</Title>
      <PointWrapper>
        <AutoSizedImage
          source={require("@assets/icon/points.png")}
          height={30}
        />
        <Title style={{ marginLeft: 5 }}>{point.toLocaleString()}</Title>
      </PointWrapper>
    </Box>
  );
};

const Box = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 70px;
  border-radius: 8px;
  background-color: ${(props) => props.COLOR.THEME.primary[130]};
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  ${TYPO_STYLE.Body[2].Bold};
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

const PointWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MyPointBox;
