import styled from "styled-components/native";
import Log from "./Log";
import { useSearch } from "@hooks/useSearch";

const LogWrapper = () => {
  const [records, setRecords] = useSearch();
  return (
    <Container>
      {records.map((log, idx) => (
        <Log
          title={log}
          key={`${log}_${idx}`}
          onPress={() => setRecords(records.filter((re) => re !== log))}
        />
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
