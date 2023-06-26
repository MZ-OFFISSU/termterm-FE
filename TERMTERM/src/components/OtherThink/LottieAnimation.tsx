import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import styled from "styled-components/native";

/** 용어에 대한 다른생각 애니메이션 */
const LottieAnimation = () => {
  const animation = useRef(null);
  const [COLOR] = useThemeStyle();

  return (
    <Container>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 50,
          height: 50,
          transform: [{ rotate: "90deg" }],
        }}
        source={require("@assets/lottie/upscroll.json")}
      />
      <Content COLOR={COLOR}>용어에 대한 다른 생각</Content>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.THEME.primary[130]};
  margin-top: 15px;
`;

export default LottieAnimation;
