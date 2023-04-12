import styled from "styled-components/native";
import { TextProps, View, Text } from "react-native";
import { colorTheme, TEXT_STYLES, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeBar } from "@components/header";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useRef, useMemo, useCallback } from "react";
import { useBottomSheet } from '@gorhom/bottom-sheet';
import AutoSizedImage from "@components/common/AutoSizedImage";
import Button from "@components/curation/detail/term/Button";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const TermDetail = ({ navigation, route }: Props) => {
    const { expand } = useBottomSheet();
    const [COLOR, mode] = useThemeStyle();

    return (
        <>
            <Container COLOR={COLOR}>
                <Card>
                    <RoleText>프로덕트 매니저</RoleText>
                    <WordText COLOR={COLOR}>Product Manager</WordText>
                    <ExplainText COLOR={COLOR}>
                        제품의 라이프 사이클을 총 관리하는 사람이에요. 
                        회사의 비전과 전략에 기여하기 위해 어떤 제품을 왜 개발해야 하는지 고민하고 실행하는 역할을 하고, 
                        마케팅과 요구사항 수집을 통한 개발 초기에 관여하며, 
                        테스팅과 생산, 업그레이드와 세일즈까지 제품이 고객 손에 들어가는 전체 라이프 사이클에 관여하기 때문에 
                        그 제품, 서비스의 '미니 CEO'라고도 불려요.
                    </ExplainText>
                    <SourceText COLOR={COLOR}>
                        https://www.jobindexworld.com/contents/view/7923
                    </SourceText>
                </Card>

                <FlexBox>
                    <AutoSizedImage 
                        source={require("@assets/arrow-differterm.png")}
                        width={30}
                    />
                    <DifferText>용어에 대한 다른 생각</DifferText>
                    {/* <Button
                        onPress={expand}
                        title='temp button'
                    /> */}
                </FlexBox>
            </Container>
        </>
    )
}

export default TermDetail;

const Container = styled.View<{ COLOR: colorTheme }>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.COLOR.Background.surface};
    padding: 20px 16px;
`;


// const Card = styled.TouchableOpacity<{ COLOR: colorTheme }>`
//     width: 358px;
//     height: 358px;
//     margin: 5px auto;
//     border-radius: 10px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     overflow: hidden;
//     background-color: ${(props) => props.COLOR.Background.surface};
//     margin-bottom: 30px;
// `;
const Card = styled.View`
    width: 358px;
    height: 358px;
    margin: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: ${LIGHT_COLOR_STYLE.THEME.primary[10]};
    margin-bottom: 30px;
`;

    /* font-size: ${TEXT_STYLES.2xsm.Md?.fontSize}px;
    font-weight: ${TEXT_STYLES.2xsm.Md?.fontWeight}; */

/* TODO: dark / light 따라 변경 */
const RoleText = styled.Text`
    color: ${LIGHT_COLOR_STYLE.THEME.primary[160]};
    margin: 5px;
`;

const WordText = styled.Text<{ COLOR: colorTheme }>`
    color: ${LIGHT_COLOR_STYLE.Text.active};
    /* font-size: ${TEXT_STYLES['2xl'].Eb?.fontSize}px; */
    font-size: 32px;
    font-weight: bold;
    margin: 10px;
`;

const ExplainText = styled.Text<{ COLOR: colorTheme }>`
    color: ${LIGHT_COLOR_STYLE.Text.darken};
    font-size: ${TEXT_STYLES.sm.Reg?.fontSize}px;
    font-weight: ${TEXT_STYLES.sm.Reg?.fontWeight};
    width: 318px;
    line-height: 25px;
    margin: 30px;
`;

const SourceText = styled.Text<{ COLOR: colorTheme}>`
    font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
    font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.THEME.primary.variant};
    align-items: left;
`;

const FlexBox = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
`;

const DifferText = styled.TouchableOpacity`
    font-size: ${TEXT_STYLES.xsm.Md?.fontSize}px;
    font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.THEME.primary[130]};
    margin-top: 10px;
`;

const DifferBox = styled.View`
    width: 100%;
    height: 165px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DifferContent = styled.Text`
    font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
    font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.Text.active};
`;

const DifferSource = styled.Text`
    font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
    font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.Text.disabled};
`;

const DifferProfile = styled.View`
    display: flex;
    
`;