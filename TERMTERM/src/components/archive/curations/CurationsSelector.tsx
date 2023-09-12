import styled from "styled-components/native";
import { CurationItem } from "@components/curation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useCallback, useEffect, useState } from "react";
import { useCuration } from "@hooks/useCuration";
import { RefreshControl } from "react-native";

/**
 * 아카이브 툴바에서 큐레이션 탭을 클릭했을 때 나타나는 부분 컴포넌트
 */
const CurationsSelector = () => {
  const { arcihivedCurationList, getArchivecurationList } = useCuration();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      getArchivecurationList();
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
      }
    >
      <CurationCardWrapper>
        {arcihivedCurationList.map((item, idx) => (
          <CurationItem
            item={{
              bookmarked: "YES",
              cnt: item.cnt,
              curationId: item.curationId,
              description: item.description,
              title: item.title,
              thumbnail: "",
            }}
            img={""}
            onMove={() =>
              navigation.push("CurationDetail", { id: item.curationId })
            }
            key={item.title}
            style={{ marginTop: 30 }}
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
`;

export default CurationsSelector;
