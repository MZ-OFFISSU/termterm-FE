import styled from "styled-components/native";
import Log from "./Log";

interface Props {
  logs: Array<string>;
}

const LogWrapper = ({ logs }: Props) => {
  return (
    <Container>
      {logs.map((log, idx) => (
        <Log title={log} key={log} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default LogWrapper;
