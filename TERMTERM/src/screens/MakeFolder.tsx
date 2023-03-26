import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState, useEffect } from "react";
import InputWrapper from "@components/makefolder/InputWrapper";
import { Keyboard } from "react-native";
import CompleteButton from "@components/makefolder/CompleteButton";

export type Props = StackScreenProps<RootStackParamList, "MakeFolder">;

const MakeFolder = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState({
    name: "",
    desc: "",
  });
  const [btnPosition, setBtnPosiition] = useState(30);

  //임시로 만들어놓은 완료버튼 핸들러
  //통신 및 다양한 수정이 필요함...
  const onComplete = () => {
    info.name !== "" ? navigation.pop() : null;
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setBtnPosiition(10 + e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setBtnPosiition(30);
    });

    showSubscription;
    hideSubscription;
  }, []);

  return (
    <Container COLOR={COLOR}>
      <Wrapper>
        <InputWrapper
          subtitle="폴더 이름"
          value={info.name}
          max={10}
          inevitable={true}
          placeholder={"예시) 기획, 디자인, 개발, IT, 비즈니스 등"}
          onChangeText={(text) => setInfo({ ...info, name: text })}
          returnKeyType="done"
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
        ready={info.name !== ""}
        position={btnPosition}
        onPress={() => onComplete()}
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

export default MakeFolder;
