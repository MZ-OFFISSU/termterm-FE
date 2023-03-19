import styled from "styled-components/native";
import TermPreviewBox from "./TermPreviewBox";

interface Preview {
  id: number;
  name: string;
  description: string;
  bookmarked: boolean;
}

interface Props {
  items: Array<Preview>;
}

const TermPreview = ({ items }: Props) => {
  return (
    <Container>
      {items.map((item, idx) => (
        <TermPreviewBox {...item} key={item.id} />
      ))}
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

export default TermPreview;
