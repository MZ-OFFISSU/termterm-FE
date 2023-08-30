import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState, useEffect } from "react";
import InputWrapper from "@components/makefolder/InputWrapper";
import { Keyboard } from "react-native";
import CompleteButton from "@components/makefolder/CompleteButton";
import Toast from "react-native-toast-message";
import { useFolder } from "@hooks/useFolder";

export type Props = StackScreenProps<RootStackParamList, "EditFolder">;

const EditFolder = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState({
    prevName: "",
    prevDesc: "",
    name: "",
    desc: "",
  });
  const [btnPosition, setBtnPosiition] = useState(30);
  const { getUsersFolderList, myFolderList, editFolderInfo } = useFolder();

  //TODO 여기서 폴더 기본 정보 받아오기
  const settingPrevInfo = () => {
    const folderId = route.params.id;
    const folderInfo = myFolderList && myFolderList[folderId];
    if (folderInfo) {
      const prevInfo = {
        prevName: folderInfo.title,
        prevDesc: folderInfo.description,
        name: folderInfo.title,
        desc: folderInfo.description,
      };
      setInfo(prevInfo);
    }
  };

  const showToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "폴더 수정이 완료 되었어요!",
    });
  };

  const onComplete = () => {
    if (info.name !== info.prevName || info.desc !== info.prevDesc) {
      editFolderInfo({
        description: info.desc,
        folderId: route.params.id,
        name: info.name,
      });
      showToast();
      navigation.pop();
    }
  };

  useEffect(() => {
    getUsersFolderList();
    // console.log(
    //   "이전 이름 : ",
    //   info.prevName,
    //   "이전 설명 : ",
    //   info.prevDesc,
    //   "바뀐 이름 : ",
    //   info.name,
    //   "바뀐 설명 : ",
    //   info.desc
    // );
  }, []);

  useEffect(() => {
    settingPrevInfo();

    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setBtnPosiition(10 + e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setBtnPosiition(30);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [myFolderList]);

  return (
    <Container COLOR={COLOR}>
      <Wrapper>
        <InputWrapper
          subtitle="폴더 이름"
          value={info.name}
          max={10}
          inevitable={true}
          placeholder={"예시) 기획, 디자인, 개발, IT, 비즈니스 등"}
          onChangeText={(text) => setInfo((prev) => ({ ...prev, name: text }))}
          returnKeyType="done"
          warning="폴더 이름은 필수로 입력해야해요."
        />
      </Wrapper>
      <Wrapper style={{ marginTop: 40 }}>
        <InputWrapper
          subtitle="폴더 설명"
          value={info.desc}
          max={25}
          inevitable={false}
          placeholder={"예시) 기획관련 용어들의 모음"}
          onChangeText={(text) => setInfo({ ...info, desc: text })}
          returnKeyType="done"
        />
      </Wrapper>
      <CompleteButton
        ready={info.name !== info.prevName || info.desc !== info.prevDesc}
        position={btnPosition}
        onPress={onComplete}
      />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  padding: 30px 16px;
  background-color: ${(props) => props.COLOR.Background.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const Wrapper = styled.View`
  width: 100%;
  padding: 0px 16px;
`;

export default EditFolder;
