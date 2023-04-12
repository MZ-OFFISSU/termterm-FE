import styled from "styled-components/native";
import { TextProps, View, Text } from "react-native";
import { DiscussionProps } from "@interfaces/discussion";
import { TEXT_STYLES, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props extends DiscussionProps {
    onMove: (id: number) => void;
}

const DiscussionItem = ({
    id, 
    authorName, 
    authorJob, 
    createdDate, 
    opinion, 
    source, 
    likeCnt,
    ...props
}: Props) => {
    const [COLOR, mode] = useThemeStyle();
    return (
        <DiscussionBox>
            <OpinionText></OpinionText>
        </DiscussionBox>
    );
}

export default DiscussionItem;

const DiscussionBox = styled.View`
    display: flex;
    width: 100%;
    padding: 15px;
    height: 165px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

`;

const OpinionText = styled.Text`
    font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}px;
    font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.Text.active};
    width: 358px;
`;

const SourceText = styled.Text`
    font-size: ${TEXT_STYLES["3xsm"].Md?.fontSize}px;
    font-weight: ${TEXT_STYLES["3xsm"].Md?.fontWeight};
    color: ${LIGHT_COLOR_STYLE.Text.disabled};
`

const RowFlexBox = styled.View`
    display: flex;
    width: 358px;
    height: 34px;
    align-items: flex-start;
`;


const dummy: Array<DiscussionProps> = [
    {
        id: 0,
        authorName: '초코우유',
        authorJob: '기획자',
        createdDate: '2023-04-12 12:00',
        opinion: '기획자는 사람입니다.',
        source: 'http://www.jobworld.com/view/1234',
        likeCnt: 13,
    },
    {
        id: 1,
        authorName: '마라샹궈',
        authorJob: '디자이너',
        createdDate: '2023-04-12 12:00',
        opinion: '디자이너는 사람입니다.',
        source: 'http://www.jobworld.com/view/5412',
        likeCnt: 13,
    },
    {
        id: 2,
        authorName: '마라탕',
        authorJob: '프론트엔드',
        createdDate: '2023-04-11 12:00',
        opinion: '프론트엔드 개발자는 사람입니다.',
        source: 'http://www.jobworld.com/view/4321',
        likeCnt: 13,
    },
    {
        id: 3,
        authorName: '파스타',
        authorJob: '백엔드',
        createdDate: '2023-04-13 12:00',
        opinion: '백엔드 개발자는 사람입니다.',
        source: 'http://www.jobworld.com/view/1234',
        likeCnt: 13,
    },
]