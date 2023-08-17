import AutoSizedImage from "@components/common/AutoSizedImage";
import { TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";

interface Props {
  collapse: boolean;
}

const Fold = ({ collapse }: Props) => {
  return (
    <Wrapper>
      <AutoSizedImage
        source={require("../../../../assets/tutorials/coach/hand1.png")}
        width={45}
      />
      <Content>
        {collapse
          ? `단어를 모아서\n볼 수 있어요!`
          : `단어를 하나씩\n볼 수 있어요!`}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  position: absolute;
  top: 100px;
  right: 30px;
`;

const Content = styled.Text`
  ${TYPO_STYLE.Body[2].Medium};
  color: white;
  white-space: pre-line;
  margin-top: 10px;
  text-align: right;
`;

export default Fold;
