import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { UrlText, NonScrollContainer, WordCard, DailyQuizRouter } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import SocialLoginButton from "@components/buttons/SocialLogin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { ScrollView, SafeAreaView } from 'react-native';

interface TextType {
    username: string
    title?: string
    subtitle?: string
}

const Mainhome = () => {
    const [bookmarkBool, setBookmarkBool] = useState(false);

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
                <TitleContainer 
                    username={"세원"}
                    title={"님을 위한 큐레이션"}
                />
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
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
}))``;

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

export default Mainhome;