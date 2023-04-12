/**
* 용어에 대한 다른 생각 데이터
*/
export interface DiscussionProps {
    id: number,
    authorName: string;
    authorJob: string;
    createdDate: string;
    opinion: string,
    source: string,
    likeCnt: number,
}