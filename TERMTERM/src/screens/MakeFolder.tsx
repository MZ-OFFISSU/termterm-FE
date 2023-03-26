import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { screenHeight } from "@style/dimensions";
import { useState } from "react";
import InputWrapper from "@components/makefolder/InputWrapper";

export type Props = StackScreenProps<RootStackParamList, "MakeFolder">;

const MakeFolder = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState({
    name: "",
    desc: "",
  });

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
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: ${screenHeight}px;
  padding: 30px 32px;
  background-color: ${(props) => props.COLOR.Background.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Wrapper = styled.View`
  width: 100%;
`;

export default MakeFolder;
