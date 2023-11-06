import styled from "styled-components/native";
import { useCallback, useEffect, useState } from "react";
import { EmptyWordCard, DailyQuizRouter } from "@components/index";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { RefreshControl, SafeAreaView } from "react-native";
import { CurationItem } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { WordCarousel } from "@components/terms/";
import DailyTermContainer from "@components/home/DailyTermContainer";
import { Octicons } from "@expo/vector-icons";
import { useHome } from "@hooks/useHome";
import { useCuration } from "@hooks/useCuration";
import Tutorial from "@components/popup/tutorials";
import { useCoach } from "@hooks/useCoach";
import { useRecoilState, useRecoilValue } from "recoil";
import { tutorialState } from "@recoil/tutorialState";
import Coachmark from "@components/popup/coach";
import { useArchive } from "@hooks/useArchive";
import { useTerm } from "@hooks/useTerm";
import { useMember } from "@hooks/useMember";
import { Category } from "Curation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

interface TextType {
  maintitle: string;
  subtitle?: string;
}

/**기본 스크린
 * 필요시 수정가능합니다.
 */
const Home = ({ navigation, route }: Props) => {
  const { getEachCategoryCurationList, categoryCurationList } = useCuration();
  const { user } = useMember();

  const { archivedWords, getArchiveListInHome } = useArchive();
  const { getDailyTerm } = useTerm();

  const [COLOR, mode] = useThemeStyle();
  const { homeMainTitle, homeSubTitle } = useHome();
  const { isOpen, hideCoach, checked, handleCheck } = useCoach();
  const [refresh, setRefresh] = useState(false);

  const [visible, setVisible] = useRecoilState(tutorialState);
  const [tutorialChecked, setTutorialChecked] = useState(false);
  const { openCoach } = useCoach();

  const getVisible = async () => {
    const data = await AsyncStorage.getItem("tutorial");
    if (!data) setVisible(true);
    else openCoach("slide");
  };

  const hideTutorial = async () => {
    if (tutorialChecked) await AsyncStorage.setItem("tutorial", "hide");
    setVisible(false);
    openCoach("slide");
  };

  const handleTutorialCheck = () => {
    setTutorialChecked((prev) => !prev);
  };

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      getArchiveListInHome();
      getDailyTerm();
      getEachCategoryCurationList(
        user.info?.categories[0].toLowerCase() as Category
      );
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    getVisible();
  }, []);

  useEffect(() => {
    getArchiveListInHome();
    getEachCategoryCurationList(
      user.info?.categories[0].toLowerCase() as Category
    );
  }, []);

  return (
    <SafeAreaView>
      <Container
        COLOR={COLOR}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
        }
      >
        <InnerContainer>
          <TitleContainer maintitle={homeMainTitle} subtitle={homeSubTitle} />
          {archivedWords ? (
            <WordCarousel words={archivedWords} dots={true} />
          ) : (
            <EmptyWordCard style={{ marginTop: 20 }} />
          )}
          <TitleBox style={{ marginTop: 50 }}>
            <MenuTitle COLOR={COLOR}>Daily 용어 퀴즈</MenuTitle>
          </TitleBox>
          <DailyQuizRouter navigation={navigation} route={route} />
          <FlexContainer>
            <CurationTitleBox>
              <MenuTitleWrapper>
                <MenuTitle COLOR={COLOR}>오늘의 용어</MenuTitle>
              </MenuTitleWrapper>
              <CurationViewBtn onPress={() => navigation.push("AllTerms")}>
                <CurationViewBtnContent COLOR={COLOR}>
                  전체보기
                </CurationViewBtnContent>
                <Octicons
                  name="chevron-right"
                  size={15}
                  color={COLOR.Text.default}
                  style={{ marginLeft: 8 }}
                />
              </CurationViewBtn>
            </CurationTitleBox>
          </FlexContainer>
          <DailyTermContainer />
          <FlexContainer>
            <CurationTitleBox>
              <MenuTitleWrapper>
                <MenuTitle COLOR={COLOR}>나를 위한 추천 큐레이션</MenuTitle>
              </MenuTitleWrapper>
              <CurationViewBtn onPress={() => navigation.push("Curation")}>
                <CurationViewBtnContent COLOR={COLOR}>
                  전체보기
                </CurationViewBtnContent>
                <Octicons
                  name="chevron-right"
                  size={15}
                  color={COLOR.Text.default}
                  style={{ marginLeft: 8 }}
                />
              </CurationViewBtn>
            </CurationTitleBox>
          </FlexContainer>
          <CurationCardWrapper>
            {categoryCurationList.slice(0, 3).map((item, idx) => (
              <CurationItem
                item={item}
                onMove={() =>
                  navigation.push("CurationDetail", { id: item.curationId })
                }
                img={item.thumbnail}
                style={{ marginTop: 30 }}
              />
            ))}
          </CurationCardWrapper>
        </InnerContainer>
        {isOpen ? (
          <Coachmark
            type="slide"
            isOpen={isOpen}
            checked={checked}
            handleCheck={handleCheck}
            hideCoach={hideCoach}
          />
        ) : (
          <Tutorial
            visible={visible}
            checked={tutorialChecked}
            handleCheck={handleTutorialCheck}
            hideTutorial={hideTutorial}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

const TitleContainer = (props: TextType) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <TitleBox>
      <Title COLOR={COLOR}>{props.maintitle}</Title>
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
  padding: 20px 16px;
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
  ${TYPO_STYLE.Heading[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
  opacity: 0.95;
`;

const MenuTitleWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const MenuTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Heading[3].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const SubTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Medium};
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
  ${TYPO_STYLE.Subheading[1].Medium};
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
