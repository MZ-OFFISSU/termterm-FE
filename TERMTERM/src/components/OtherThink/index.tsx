import BottomSheet from "@gorhom/bottom-sheet";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { WordProps } from "@interfaces/word";
import { TYPO, TYPO_STYLE, colorTheme } from "@style/designSystem";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

interface HandleProps {
  contents: string;
}

interface Props {
  word: WordProps;
}

const CustomHandle = ({ contents }: HandleProps) => {
  const [COLOR] = useThemeStyle();

  return (
    <CustomHandleWrapper COLOR={COLOR} style={styles.handle}>
      <HandleHorizon />
      <Title COLOR={COLOR}>{contents}</Title>
    </CustomHandleWrapper>
  );
};

/** 단어에 대한 다른 생각 바텀 시트 */
const OtherThink = ({ word }: Props) => {
  const contents = ["용어에 대한 다른 생각", word.name];
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
      handleComponent={() => <CustomHandle contents={contents[curIdx]} />}
      onChange={handleSheetChanges}
    >
      <></>
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

export default OtherThink;
