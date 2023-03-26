import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { BookmarkedCurations, BookmarkedTerms } from "@components/archive";
import CustomModal from "@components/popup/modal";

export type RootProps = StackScreenProps<RootStackParamList, "ToolBar">;

interface Props extends RootProps {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const TYPES = ["용어", "큐레이션"];
const TYPES_WRAPPER = [BookmarkedTerms, BookmarkedCurations] as const;

const Archive = ({ modal, setModal, navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curType, setCurType] = useState(0);
  const CurComponents = TYPES_WRAPPER[curType];

  //폴더 생성 관련 상태
  const [restedFolder, setRestedFolder] = useState(9);

  const gotoMakefolder = () => {
    navigation.push("MakeFolder");
    setModal(false);
  };

  return (
    <>
      <Container COLOR={COLOR}>
        <TypeSelector>
          {TYPES.map((type, idx) => (
            <TouchableOpacity
              key={type}
              onPress={() => setCurType(idx)}
              style={{ marginLeft: idx !== 0 ? 15 : 0 }}
            >
              <Type
                selected={curType === idx}
                style={{ color: COLOR.Text.active }}
              >
                {type}
              </Type>
            </TouchableOpacity>
          ))}
        </TypeSelector>
        <CurComponents type={TYPES[curType]} />
      </Container>
      <CustomModal
        visible={modal}
        title={"폴더는 포인트 없이 3개까지 생성할 수 있어요."}
        subtitle={`폴더 생성 가능 횟수 : ${restedFolder}개`}
        btnTitle={["확인"]}
        onNext={() => gotoMakefolder()}
      />
    </>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 16px;
`;

const TypeSelector = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Type = styled.Text<{ selected: boolean }>`
  font-size: ${(props) =>
    props.selected
      ? TEXT_STYLES.md2.Bd?.fontSize
      : TEXT_STYLES.md2.Reg?.fontSize}px;
  font-weight: ${(props) =>
    props.selected
      ? TEXT_STYLES.md2.Bd?.fontWeight
      : TEXT_STYLES.md2.Reg?.fontWeight};
`;

export default Archive;
