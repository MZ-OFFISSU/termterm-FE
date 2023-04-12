import { Category, Comment } from "./term";

/** main screen 등에서 사용되는 word 컴포넌트
* (용어(한글), 용어(영어), 용어 설명, 용어 출처)
*/
export interface WordProps {
    id: number,
    name: string,
    description: string,
    source: string,
    categories: Array<Category>,
    comments: Array<Comment>,
}