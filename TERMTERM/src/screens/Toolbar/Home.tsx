import styled from "styled-components/native";
import { useState } from "react";
import { EmptyWordCard, DailyQuizRouter, WordCard } from "@components/index";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { TouchableOpacity, Text } from "react-native";
import { HomeBar } from "@components/header";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

interface TextType {
  username: string;
  title?: string;
  subtitle?: string;
}

const dummy: Array<CurationItemProps> = [
  {
    id: 0,
    title: "개발자 필수용어 30개",
    img: "https://i.pinimg.com/736x/4b/bb/5a/4bbb5aec811322f1bd75dec7f860d251.jpg",
    counts: 30,
    marked: true,
  },
  {
    id: 1,
    title: "UI/UX에게 꼭 필요한 실무 용어 20개",
    img: "https://i.pinimg.com/564x/bc/0d/10/bc0d109e5e3df2a7d30298fe094c9e7a.jpg",
    counts: 30,
    marked: false,
  },
  {
    id: 2,
    title: "원활한 커뮤니케이션을 위한 비즈니스 용어",
    img: "https://i.pinimg.com/564x/1f/54/54/1f54548fb67b7c0e449c86625708eafe.jpg",
    counts: 30,
    marked: false,
  },
];

/**기본 스크린
 * 필요시 수정가능합니다.
 */
const Home = ({ navigation, route }: Props) => {
  const [idx, setIdx] = useState(0);
  const [isArchive, setIsArchive] = useState<boolean>(false);

  //색상은 이걸로 넘겨서 쓰시면 됩니당.
  //타입은 import 해둔 colorTheme
  const [COLOR, mode] = useThemeStyle();

  return (
    <SafeAreaView>
      <Container>
        <HomeBar onSearch={() => navigation.push("Search")} />
        {isArchive ?
          <>
            <TitleContainer
              username={"세원"}
              title={"님, 오늘도 파이팅👏"}
              subtitle={"아카이빙한 용어를 확인해보세요!"}
            />
            <WordCard />
          </>
        : 
        <>
          <TitleContainer
            username={"세원"}
            title={"님, 오늘도 파이팅"}
            subtitle={"아카이빙한 용어가 없습니다."}
          />
          <EmptyWordCard />
        </>
      }
        <TitleBox>
          <Title>Daily 용어 퀴즈</Title>
        </TitleBox>
        <DailyQuizRouter navigation={navigation} route={route} />
        <FlexContainer>
          <TitleContainer username={"세원"} title={"님을 위한 큐레이션"} />
          <TouchableOpacity
            onPress={() => navigation.push("Curation")}
            style={{ width: 200, position: "absolute", top: 15, left: 290 }}
          >
            <Text>전체보기 〉 </Text>
          </TouchableOpacity>
        </FlexContainer>
        <CurationCardWrapper>
          {dummy.map((item, idx) => (
            <CurationItem
              {...item}
              onMove={() => navigation.push("CurationDetail", { id: item.id })}
              key={item.img}
              style={{ marginTop: 20 }}
            />
          ))}
        </CurationCardWrapper>
      </Container>
    </SafeAreaView>
  );
};

const TitleContainer = (props: TextType) => {
  return (
    <TitleBox>
      <Title>
        {props.username}
        {props.title}
      </Title>
      <SubTitle>{props.subtitle}</SubTitle>
    </TitleBox>
  );
};

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "175%",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
}))``;

const FlexContainer = styled.View`
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  margin: 10px 0;
`;

const TitleBox = styled.View`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: #0d0d0d;
  opacity: 0.95;
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #303030;
  opacity: 0.95;
`;

const CurationCardWrapper = styled.View`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: -40px;
`;

export default Home;
