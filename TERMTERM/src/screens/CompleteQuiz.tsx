import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "@components/header";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

export type Props = StackScreenProps<RootStackParamList, "CompleteQuiz">;

const CompleteQuiz = ({ navigation }: Props) => {
    const [width, setWidth] = useState(112);
    const [COLOR, mode] = useThemeStyle();
    const [allCorrect, setAllCorrect] = useState(false);

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
        <SafeAreaView style={{ marginTop: "-15%" }}>
            <BackBar title="Daily 용어 퀴즈" onBack={() => navigation.pop()} />
            <Container COLOR={COLOR}>
                <ContentWrapper>
                    <AutoSizedImage
                        source={allCorrect 
                            ? require("@assets/complete-quiz.png") 
                            : require("@assets/done-quiz.png")}
                        width={width}
                        style={{ marginTop: 70}}
                    />
                    <TitleBox>
                        <Title COLOR={COLOR}>Daily 용어 퀴즈 완료 🎉</Title>
                        <SubTitle COLOR={COLOR}>
                            {allCorrect 
                            ? `Daily 용어 퀴즈를 모두 맞추셨어요!\n`
                            : `Daily 용어 퀴즈를 응시하셨어요!\n`}
                            <SubTitle COLOR={COLOR} style={{ fontWeight: "900"}}>
                            {allCorrect ? `200` : `100`}포인트
                            </SubTitle>
                            를 얻었습니다
                        </SubTitle>
                    </TitleBox>
                        <CompleteButton
                            COLOR={COLOR}
                            mode={mode}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <ButtonText COLOR={COLOR} mode={mode}>홈으로 돌아가기 〉 </ButtonText>
                        </CompleteButton>
                </ContentWrapper>
            </Container>
        </SafeAreaView>
    )
}

const Container = styled.View<{ COLOR: colorTheme}>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.COLOR.Background.surface};
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

const Title = styled.Text<{ COLOR: colorTheme }>`
    font-size: 25px;
    font-weight: 900;
    color: ${(props) => props.COLOR.Text.active};
    margin-bottom: 5px;
`;

const SubTitle = styled.Text<{ COLOR: colorTheme }>`
    font-size: 17px;
    font-weight: 500;
    color: ${(props) => props.COLOR.Text.default};
    margin-top: 10px;
    text-align: center;
    line-height: 25px;
`;

const CompleteButton = styled.TouchableOpacity<{
    COLOR: colorTheme;
    mode: boolean;
}>`
    width: 318px;
    height: 44px;
    z-index: 2;
    background-color: ${(props) => props.mode 
    ? props.COLOR.Neutral[100] 
    : props.COLOR.Background.onSurface};
    border-radius: 50%;
    margin-top: 60px;
`;

const ButtonText = styled.Text<{
    COLOR: colorTheme;
    mode: boolean;
}>`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: auto 0;
    color: ${(props) => props.COLOR.Text.lighten};
`;

export default CompleteQuiz;