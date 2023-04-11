import styled from "styled-components/native";
import { TextProps, View, Text } from "react-native";
import { colorTheme, TEXT_STYLES, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeBar } from "@components/header";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useRef, useMemo, useCallback } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import AutoSizedImage from "@components/common/AutoSizedImage";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const TermDiscussion = ({ navigation, route }: Props) => {
    return (
        <>
            <Container>
                <RowFlexBox>
                    <Title>용어에 대한 다른 생각</Title>
                    <Text>좋아요 순</Text>
                </RowFlexBox>
            </Container>
        </>
    )
}

export default TermDiscussion;

const Container = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const RowFlexBox = styled.View`
    display: flex;
    flex-direction: row;
    padding: 5px 20px;
    width: 100%;
    justify-content: space-between; 
`;

// TODO : 라이트 & 다크모드에 따른 스타일링
const Title = styled.Text`
    color: ${LIGHT_COLOR_STYLE.Text.active};
    font-size: ${TEXT_STYLES.md1.Bd?.fontSize}px;
    font-weight: ${TEXT_STYLES.md1.Bd?.fontWeight};
`;

const DiscussionBox = styled.View`

`;

