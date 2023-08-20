import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import MyPointBox from "@components/my/Point/MyPointBox";
import HistoryWrapper from "@components/my/Point/HistoryWrapper";
import { useProfile } from "@hooks/useProfile";

/**
 * 내 포인트 스크린
 */
const MyPoint = () => {
  const [COLOR, mode] = useThemeStyle();
  const { profileInfo } = useProfile();

  return (
    <Container COLOR={COLOR}>
      <InnerContainer>
        <MyPointBox point={profileInfo.point} />
        <HistoryWrapper style={{ marginTop: 33 }} />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px 40px 16px;
`;

export default MyPoint;
