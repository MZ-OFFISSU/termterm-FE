import styled from "styled-components/native";
import { BackBar } from "@components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { CurationItem, CurationSelector } from "@components/curation";
import { useState } from "react";
import { CurationItemProps } from "@interfaces/curation";

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

const dummy: Array<CurationItemProps> = [
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/4b/bb/5a/4bbb5aec811322f1bd75dec7f860d251.jpg",
    counts: 30,
    marked: true,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/bc/0d/10/bc0d109e5e3df2a7d30298fe094c9e7a.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/1f/54/54/1f54548fb67b7c0e449c86625708eafe.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/564x/40/c0/60/40c060565d91ce3129ac3f793cffb123.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/e1/28/3f/e1283f0f99784ca39e96c1c1ac852b0f.jpg",
    counts: 30,
    marked: false,
  },
  {
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/c9/42/af/c942af268f1b8d836ab39f0846e0a745.jpg",
    counts: 30,
    marked: false,
  },
];

const Curation = ({ navigation }: Props) => {
  const [idx, setIdx] = useState(0);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Container stickyHeaderIndices={[0]}>
        <BackBar title="전체 큐레이션" onBack={() => navigation.pop()} />
        <ContentWrapper>
          <CurationSelector
            items={curationItems}
            curIdx={idx}
            setIdx={(idx: number) => setIdx(idx)}
          />
          <CurationCardWrapper>
            {dummy.map((item, idx) => (
              <CurationItem
                {...item}
                key={item.img}
                style={{ marginTop: 20 }}
              />
            ))}
          </CurationCardWrapper>
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
  padding: 25px 20px 50px 20px;
`;

const CurationCardWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
`;

export default Curation;
