import BottomSheet from "@gorhom/bottom-sheet";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { WordProps } from "@interfaces/word";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import Container from "./Container";
import { Entypo } from "@expo/vector-icons";
import { useWordReg } from "@hooks/useWordReg";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

interface HandleProps {
  contents: string;
}

interface FooterProps {
  id: number;
}
interface Props {
  word: WordProps;
}

/** 커스텀 핸들 컴포넌트 (바텀시트 내부)*/
const CustomHandle = ({ contents }: HandleProps) => {
  const [COLOR] = useThemeStyle();

  return (
    <CustomHandleWrapper COLOR={COLOR} style={styles.handle}>
      <HandleHorizon />
      <Title COLOR={COLOR}>{contents}</Title>
    </CustomHandleWrapper>
  );
};

/** 커스텀 푸터 컴포넌트 (바텀시트 내부) */
const CustomFooter = ({ id }: FooterProps) => {
  const [COLOR] = useThemeStyle();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigate = () => {
    navigation.push("MyWordApply", { id: id });
  };

  return (
    <CustomFooterWrapper COLOR={COLOR}>
      <FooterButton onPress={navigate} COLOR={COLOR}>
        <FooterContent COLOR={COLOR}>
          나만의 설명을 남기고 싶어요!
        </FooterContent>
        <Entypo name="chevron-right" size={20} color={COLOR.Text.default} />
      </FooterButton>
    </CustomFooterWrapper>
  );
};

/** 단어에 대한 다른 생각 바텀 시트 */
const OtherThink = ({ word }: Props) => {
  const [sub, main] = useWordReg(word.name);
  const contents = ["용어에 대한 다른 생각", main];
  const [curIdx, setCurIdx] = useState(0);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["10%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setCurIdx(index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleComponent={() => <CustomHandle contents={contents[curIdx]!} />}
      onChange={handleSheetChanges}
      footerComponent={() => <CustomFooter id={word.id} />}
    >
      <Container comments={word.comments} />
    </BottomSheet>
  );
};

const CustomHandleWrapper = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const styles = StyleSheet.create({
  handle: {
    shadowColor: "#00000024",
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowOpacity: 0.23,
    shadowRadius: 10,
    elevation: 4, // Android에서 그림자 표시를 위해 필요합니다.
  },
});

const HandleHorizon = styled.View`
  width: 40px;
  height: 5px;
  border-radius: 18px;
  background-color: #c8cfd8;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 10px;
`;

const CustomFooterWrapper = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const FooterButton = styled.TouchableOpacity<{ COLOR: colorTheme }>`
  width: 320px;
  height: 44px;
  border-radius: 100px;
  background-color: ${(props) => props.COLOR.Background.onSurface};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FooterContent = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.default};
`;

export default OtherThink;
