import styled from "styled-components/native";
import { useState, useEffect } from "react";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { DARK_COLOR_STYLE, LIGHT_COLOR_STYLE, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import QuizCard from "@components/quiz/QuizCard";
import { BackBar } from "@components/header";
import { Button } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const dummy: Array<DailyQuizItemProps> = [
    {
        word: "가독성",
        explain: "얼마나 쉽게 읽을 수 있는지를 나타내는 정도를 뜻하는 말이에요. 프로그래밍에서의 가독성은 소스코드를 보고 코드가 의도하는 동작이나 알고리즘을 얼마나 쉽게 이해할 수 있는지를 뜻해요.",
    },
    {
        word: "Stakeholder",
        explain: "지폐나 동전과 같은 실물이 없이 네트워크로 연결된 특정한 가상공간(vitual community)에서 전자적 형태로 사용되는 디지털 화폐 또는 전자화폐를 말해요."
    },
    {
        word: "Product Manager",
        explain: "얼마나 쉽게 읽을 수 있는지를 나타내는 정도를 뜻하는 말이에요. 프로그래밍에서의 가독성은 소스코드를 보고 코드가 의도하는 동작이나 알고리즘을 얼마나 쉽게 이해할 수 있는지를 뜻해요.",
    },
];

const DailyQuiz = ({ navigation }: Props) => {
    const [idx, setIdx] = useState(0);
    const [isSelect, setSelect] = useState<unknown>({
        id1: false,
        id2: false,
        id3: false,
    });

    return (
        <SafeAreaView style={{backgroundColor: "white"}}>
            <Container>
                <BackBar title={`${idx + 1}/5`} onBack={() => navigation.pop()} />
                <Title>어떤 용어에 대한 설명일까요?</Title>
                <QuizCard explain={dummy[idx].explain} />
                {dummy.map((item, idx) => (
                    <QuizButton
                        onPress={() => navigation.push("CompleteQuiz")}
                    >
                        <ButtonText>{item.word}</ButtonText>
                    </QuizButton>
                ))}
            </Container>
        </SafeAreaView>
    )
}

const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    font-size: 23px;
    font-weight: 600;
    color: ${LIGHT_COLOR_STYLE.Text.active};
    text-align: center;
    margin: 40px auto;
`;

const QuizButton = styled.TouchableOpacity`
    width: 358px;
    height: 47px;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
    margin: 10px auto;
`;

const ButtonText = styled.Text`
    color: ${LIGHT_COLOR_STYLE.Text.active};
    font-size: 15px;
    text-align: center;
    margin: auto 0;
`;

export default DailyQuiz;