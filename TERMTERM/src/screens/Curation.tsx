import styled from "styled-components/native";
import { BackBar } from "@components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { CurationSelector } from "@components/curation";
import { useState } from "react";

export type Props = StackScreenProps<RootStackParamList, "Login">;

const curationItems = [
  "추천",
  "기획",
  "마케팅",
  "개발",
  "디자인",
  "비즈니스",
  "IT",
];

const Curation = ({ navigation }: Props) => {
  const [idx, setIdx] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Container>
        <BackBar title="전체 큐레이션" onBack={() => navigation.pop()} />
        <ContentWrapper>
          <CurationSelector
            items={curationItems}
            curIdx={idx}
            setIdx={(idx: number) => setIdx(idx)}
          />
        </ContentWrapper>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 70px 20px;
`;

export default Curation;
