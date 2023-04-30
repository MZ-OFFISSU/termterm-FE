import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import styled from "styled-components/native";

/**
 * 탈퇴하기 스크린의 스티커 + 내용 부분
 */
const ContentArea = () => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <AutoSizedImage source={require("@assets/cring.png")} width={95} />
      <ContentWrapper>
        <Title COLOR={COLOR}>정말 탈퇴 하시겠어요?</Title>
        <Subtitle
          COLOR={COLOR}
          mode={mode}
          style={{ marginTop: 10 }}
        >{`탈퇴하면 그 동안 생성했던 폴더,\n아카이빙했던 용어들과 큐레이션이 모두 사라져요.`}</Subtitle>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: 18px;
  font-weight: 800;
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  text-align: center;
  white-space: pre-line;
  line-height: 22px;
`;
export default ContentArea;
