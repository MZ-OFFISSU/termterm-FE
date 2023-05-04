import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "@components/header";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";

export type Props = StackScreenProps<RootStackParamList, "CompleteQuiz">;

const CompleteQuiz = ({ navigation }: Props) => {
    const [width, setWidth] = useState(112);

        /** 아이콘 너비 계산 함수 */
        const calcWidth = () => {
            if (screenWidth < 390) return;
            if (screenWidth < 435) {
                setWidth(147);
                return;
            }
            if (screenWidth < 500) {
                setWidth(172);
                return;
            }
            if (screenWidth > 500) {
                setWidth(212);
                return;
            }
        };
    
        useEffect(() => {
            calcWidth();
        }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "white"}}>
            <Container>
                <BackBar title="Daily 용어 퀴즈 완료" onBack={() => navigation.pop()} />
                <ContentWrapper>
                    <AutoSizedImage
                        source={require("@assets/complete-quiz.png")}
                        width={width}
                        style={{ marginTop: 70}}
                    />
                    <TitleBox>
                        <Title>Daily 용어 퀴즈 완료 🎉</Title>
                        <SubTitle>Daily 용어 퀴즈를 모두 맞추셨어요!</SubTitle>
                        <SubTitle>200포인트를 얻었습니다.</SubTitle>
                    </TitleBox>
                        <CompleteButton
                            onPress={() => navigation.push("Home")}
                        >
                            <ButtonText>홈으로 돌아가기 〉 </ButtonText>
                        </CompleteButton>
                </ContentWrapper>
            </Container>
        </SafeAreaView>
    )
}

const Container = styled.View`
    width: 100%;
    height: 100%;
    margin: 5px;
`;

const ContentWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px 20px 50px 20px;
`;

const TitleBox = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const Title = styled.Text`
    font-size: 25px;
    font-weight: 900;
    color: #0d0d0d;
    opacity: 0.95;
    margin-bottom: 5px;
`;

const SubTitle = styled.Text`
    font-size: 17px;
    font-weight: 500;
    color: #303030;
    margin-top: 5px;
    opacity: 0.95;
`;

const CompleteButton = styled.TouchableOpacity`
    width: 318px;
    height: 44px;
    z-index: 2;
    background-color: #1b1b1c;
    border-radius: 50%;
    margin-top: 30px;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: auto 0;
    color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

export default CompleteQuiz;