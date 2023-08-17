import AutoSizedImage from "@components/common/AutoSizedImage";
import { TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import styled from "styled-components/native";

const Slide = () => {
  return (
    <Wrapper>
      <AutoSizedImage
        width={screenWidth - 36}
        source={require("../../../../assets/tutorials/coach/hand2.png")}
      />
      <Content>{`용어 카드를\n넘겨서 학습해 보세요!`}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.Text`
  text-align: center;
  white-space: pre-line;
  ${TYPO_STYLE.Body[2].Medium};
  color: white;

  margin-top: 20px;
`;

export default Slide;
