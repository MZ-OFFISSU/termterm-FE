import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";

interface WordCardProps {
    explain: string;
}

const BookmarkWordCard = (props: WordCardProps) => {
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
            {props.explain}
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