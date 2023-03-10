import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { UrlText, NonScrollContainer, WordCard, DailyQuizRouter } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import SocialLoginButton from "@components/buttons/SocialLogin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { ScrollView, SafeAreaView } from 'react-native';
import { CurationItem, CurationSelector } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { TouchableOpacity, Text } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "Mainhome">;

interface TextType {
    username: string
    title?: string
    subtitle?: string
}

const dummy: Array<CurationItemProps> = [
    {
        title: "개발자 필수용어 30개",
        img: "https://i.pinimg.com/736x/4b/bb/5a/4bbb5aec811322f1bd75dec7f860d251.jpg",
        counts: 30,
        marked: true,
    },
    {
        title: "UI/UX에게 꼭 필요한 실무 용어 20개",
        img: "https://i.pinimg.com/564x/bc/0d/10/bc0d109e5e3df2a7d30298fe094c9e7a.jpg",
        counts: 30,
        marked: false,
    },
    {
        title: "원활한 커뮤니케이션을 위한 비즈니스 용어",
        img: "https://i.pinimg.com/564x/1f/54/54/1f54548fb67b7c0e449c86625708eafe.jpg",
        counts: 30,
        marked: false,
    },
];

const Mainhome = ({ navigation }: Props) => {
    const [bookmarkBool, setBookmarkBool] = useState(false);
    const [idx, setIdx] = useState(0);

    return (
        <SafeAreaView>
            <Container>
                <TitleContainer
                    username={"세원"} 
                    title={"님, 오늘도 파이팅"}
                    subtitle={"북마크한 용어가 없습니다."} 
                />
                <WordCard />
                <TitleBox>
                    <Title>Daily 용어 퀴즈</Title>
                </TitleBox>
                <DailyQuizRouter />
                <FlexContainer>
                    <TitleContainer 
                        username={"세원"}
                        title={"님을 위한 큐레이션"}
                    />
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
                            key={item.img}
                            style={{ marginTop: 20 }}
                        />
                    ))}
                </CurationCardWrapper>
            </Container>
        </SafeAreaView>
    )
}

const TitleContainer = (props: TextType) => {
    return (
        <TitleBox>
            <Title>{props.username}{props.title}</Title>
            <SubTitle>{props.subtitle}</SubTitle>
        </TitleBox>
    );
}

const Container = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '165%',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
}))``;

const FlexContainer = styled.View`
    width: 350px;
    display: flex;
    flex-direction: row;
    align-item: space-between;
    margin: 10px 0;
`;

const TitleBox = styled.View`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-item: flex-start;
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

export default Mainhome;