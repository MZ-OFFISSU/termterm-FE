import { TermSimple } from "Curation";
import styled from "styled-components/native";
import Button from "./Button";
import TermPreviewBox from "./TermPreviewBox";

export interface Preview {
  id: number;
  name: string;
  description: string;
  bookmarked: string;
}

interface Props {
  items: Array<TermSimple>;
  pay: boolean;
  onPay: () => void;
}

/**
 * 단어 미리보기 부분을 감싸는 컴포넌트
 */
const TermPreview = ({ items, pay, onPay }: Props) => {
  return (
    <Container>
      {items.map((item, idx) => (
        <TermPreviewBox {...item} key={item.id} />
      ))}
      {pay ? (
        <></>
      ) : (
        <ButtonWrapper>
          <Button title={"더보기"} onPress={() => onPay()} />
        </ButtonWrapper>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  padding: 30px 16px;
`;

export default TermPreview;
