import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props extends ViewProps {
  children: React.ReactNode;
}

const ContentsWrapper = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 35px;
`;

export default ContentsWrapper;
