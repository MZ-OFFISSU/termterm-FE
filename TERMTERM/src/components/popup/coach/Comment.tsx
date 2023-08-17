import AutoSizedImage from "@components/common/AutoSizedImage";
import { TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";

const Comment = () => {
  return (
    <Wrapper>
      <Content>{`용어에 대한 나만의 설명을\n남겨보세요!`}</Content>
      <AutoSizedImage
        source={require("../../../../assets/tutorials/coach/arrow.png")}
        height={30}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 230px;
`;

const Content = styled.Text`
  text-align: center;
  white-space: pre-line;
  ${TYPO_STYLE.Body[2].Medium};
  color: white;
  margin-bottom: 20px;
`;

export default Comment;
