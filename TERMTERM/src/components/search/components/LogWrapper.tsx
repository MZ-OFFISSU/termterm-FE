import styled from "styled-components/native";
import Log from "./Log";
import { useSearch } from "@hooks/useSearch";
import { useHaptics } from "@hooks/useHaptics";

const LogWrapper = () => {
  const [records, setRecords] = useSearch();
  const { haptic } = useHaptics();

  const remove = (log: string) => {
    setRecords(records.filter((re) => re !== log));
    haptic("light");
  };

  return (
    <Container>
      {records.map((log, idx) => (
        <Log title={log} key={`${log}_${idx}`} onPress={() => remove(log)} />
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
