import styled from "styled-components/native";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

interface Props {
  curations: Array<CurationItemProps>;
}

/**
 * 아카이브 툴바에서 큐레이션 탭을 클릭했을 때 나타나는 부분 컴포넌트
 */
const CurationsSelector = ({ curations }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Container>
      <CurationCardWrapper>
        {curations.map((item, idx) => (
          <CurationItem
            {...item}
            onMove={() => navigation.push("CurationDetail", { id: item.id })}
            key={item.img}
            style={{ marginTop: 20 }}
          />
        ))}
      </CurationCardWrapper>
    </Container>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  padding-bottom: 50px;
`;

const CurationCardWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

export default CurationsSelector;
