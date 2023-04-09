import styled from "styled-components/native";
import { useState } from "react";
import { EmptyWordCard, DailyQuizRouter, WordCard } from "@components/index";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { TouchableOpacity, Text } from "react-native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { Fontisto } from "@expo/vector-icons";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

interface TextType {
  username: string;
  title?: string;
  subtitle?: string;
}

/**기본 스크린
 * 필요시 수정가능합니다.
 */
const Home = ({ navigation, route }: Props) => {
  const [isArchive, setIsArchive] = useState<boolean>(false);
  const [COLOR, mode] = useThemeStyle();

  return (
    <SafeAreaView>
      <Container COLOR={COLOR}>
        <InnerContainer>
          {isArchive ? (
            <>
              <TitleContainer
                username={"세원"}
                title={"님, 오늘도 파이팅👏"}
                subtitle={"아카이빙한 용어를 확인해보세요!"}
              />
              <WordCard />
            </>
          ) : (
            <>
              <TitleContainer
                username={"세원"}
                title={"님, 오늘도 파이팅"}
                subtitle={"아카이빙한 용어가 없습니다."}
              />
              <EmptyWordCard />
            </>
          )}
          <TitleBox style={{ marginTop: 50 }}>
            <MenuTitle COLOR={COLOR}>데일리 용어 퀴즈</MenuTitle>
          </TitleBox>
          <DailyQuizRouter navigation={navigation} route={route} />
          <FlexContainer>
            <CurationTitleBox>
              <MenuTitle COLOR={COLOR}>
                {"세원"}님을 위한 추천 큐레이션
              </MenuTitle>
              <CurationViewBtn onPress={() => navigation.push("Curation")}>
                <CurationViewBtnContent COLOR={COLOR}>
                  전체보기
                </CurationViewBtnContent>
                <Fontisto
                  name="angle-right"
                  size={TEXT_STYLES["3xsm"].Reg?.fontSize}
                  color={COLOR.Text.default}
                  style={{ marginLeft: 5 }}
                />
              </CurationViewBtn>
            </CurationTitleBox>
          </FlexContainer>
          <CurationCardWrapper>
            {dummy.map((item, idx) => (
              <CurationItem
                {...item}
                onMove={() =>
                  navigation.push("CurationDetail", { id: item.id })
                }
                key={item.img}
                style={{ marginTop: 30 }}
              />
            ))}
          </CurationCardWrapper>
        </InnerContainer>
      </Container>
    </SafeAreaView>
  );
};

const TitleContainer = (props: TextType) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <TitleBox>
      <Title COLOR={COLOR}>
        {props.username}
        {props.title}
      </Title>
      <SubTitle COLOR={COLOR} mode={mode}>
        {props.subtitle}
      </SubTitle>
    </TitleBox>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 25px 16px;
`;

const FlexContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: space-between;
  margin-top: 50px;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xl.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.xl.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  opacity: 0.95;
`;

const MenuTitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.lg.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.lg.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const SubTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  font-size: ${TEXT_STYLES.xsm.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  opacity: 0.95;
  margin-top: 7px;
`;

const CurationTitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CurationViewBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`;

const CurationViewBtnContent = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
`;

const CurationCardWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: -5px;
`;

export default Home;

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
