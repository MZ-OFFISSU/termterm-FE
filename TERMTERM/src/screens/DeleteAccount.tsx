import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { ContentArea, DeleteButtons } from "@components/my/DeleteAccount";

const DeleteAccount = () => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container COLOR={COLOR}>
      <ContentArea />
      <DeleteButtons />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default DeleteAccount;
