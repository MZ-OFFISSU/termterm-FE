import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileBox from "@components/my/ProfileBox";
import Button from "@components/my/Button";

const My = () => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR}>
      <InnerContainer>
        <ProfileBox />
        <Button
          title={"프로필 수정"}
          isActivated={false}
          style={{ marginTop: 30 }}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 16px;
`;

export default My;
