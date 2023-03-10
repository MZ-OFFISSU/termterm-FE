import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { UrlText, NonScrollContainer, ArchiveSelector } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import SocialLoginButton from "@components/buttons/SocialLogin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { ScrollView, SafeAreaView } from 'react-native';
import { CurationItem, CurationSelector } from "@components/curation";
import { CurationItemProps } from "@interfaces/curation";
import { TouchableOpacity, Text } from "react-native";
import { BookmarkBar } from "@components/header";
import { DARK_COLOR_STYLE } from "@style/designSystem";

export type Props = StackScreenProps<RootStackParamList, "ArchiveBookmark">;

const archiveItems = [
    "용어",
    "큐레이션",
];

const ArchiveBookmark = ({navigation}: Props) => {
    const [width, setWidth] = useState(112);
    /** 북마크 여부 상태 */
    const [bookmarkBool, setBookmarkBool] = useState(false);
    const [idx, setIndx] = useState(0);

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
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <Container>
                <BookmarkBar 
                    onBack={() => navigation.pop()}
                    onBookmark={() => navigation.push("Mainhome")}
                    onShare={() => navigation.push("Curation")}
                    title={"아카이브"} 
                    bookmarked={false} />
                    <ContentWrapper>
                        <ArchiveSelector
                            items={archiveItems}
                            curIdx={idx}
                            setIdx={(idx: number) => setIndx(idx)}
                        />
                        <AutoSizedImage
                            source={require("@assets/bookmark-character.png")}
                            width={width}
                            style={{ marginTop: 70 }}
                        />
                        <TitleBox>
                            <Title>아직 북마크를</Title>
                            <Title>하지 않으셨군요!</Title>
                            <SubTitle>북마크를 하면 용어 아카이브를</SubTitle>
                            <SubTitle>더욱 잘 활용할 수 있어요</SubTitle>
                        </TitleBox>
                        <BookmarkButton>
                            <ButtonText>북마크 하러 가기 〉 </ButtonText>
                        </BookmarkButton>
                    </ContentWrapper>
            </Container>
        </SafeAreaView>
    );
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
    marginTop: 5px;
    opacity: 0.95;
`;

const BookmarkButton = styled.TouchableOpacity`
    width: 318px;
    height: 44px;
    z-index: 2;
    background-color: #19d24d;
    border-radius: 50%;
    margin-top: 30px;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin: auto 0;
    color: ${DARK_COLOR_STYLE.Text.active};
`;

export default ArchiveBookmark;