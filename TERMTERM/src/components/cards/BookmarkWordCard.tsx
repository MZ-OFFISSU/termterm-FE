import styled from "styled-components/native";
import { useState, useEffect } from "react";
import {
    TouchableOpacityProps,
    ImageBackground,
    ImageSourcePropType,
} from "react-native";
import { DARK_COLOR_STYLE, LIGHT_COLOR_STYLE, TEXT_STYLES, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { UrlText, NonScrollContainer, CustomButton, BUTTON_TYPE, BUTTON_STATE } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

const BookmarkWordCard = () => {
    const [width, setWidth] = useState(83);
    /** 북마크 여부 상태 */
    const [bookmarkBool, setBookmarkBool] = useState(false);

    /** 아이콘 너비 계산 함수 */
    const calcWidth = () => {
        if (screenWidth < 390) return;
        if (screenWidth < 435) {
            setWidth(118);
            return;
        }
        if (screenWidth < 500) {
            setWidth(143);
            return;
        }
        if (screenWidth > 500) {
            setWidth(183);
            return;
        }
    };

    useEffect(() => {
        calcWidth();
    }, []);

    return (
        <Card>

        </Card>
    );
}

const Card = styled.TouchableOpacity`
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

export default BookmarkWordCard;