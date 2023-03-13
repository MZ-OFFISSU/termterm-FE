import {ViewProps} from "react-native";

/**
 * 데일리 퀴즈 아이템 인터페이스
 */
export interface DailyQuizItemProps extends ViewProps {
    word: string;
    explain: string;
}