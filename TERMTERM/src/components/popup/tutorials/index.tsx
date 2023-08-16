import styled from "styled-components/native";
import Modal from "react-native-modal";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import TutorialCarousel from "./Carousel";

/**
 * 모달창 컴포넌트
 * 그냥 사용만해도 뒷 배경이 흐릿해진다!
 */
const Tutorial = () => {
  const [COLOR, mode] = useThemeStyle();
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const getVisible = async () => {
    const data = await AsyncStorage.getItem("tutorial");
    if (!data) setVisible(true);
  };

  const hideTutorial = async () => {
    if (checked) await AsyncStorage.setItem("tutorial", "hide");
    setVisible(false);
  };

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  const tmpRemoveMemory = async () => {
    //나중에 지우기
    await AsyncStorage.clear();
  };

  useEffect(() => {
    // tmpRemoveMemory();
    getVisible();
  }, []);

  return (
    <Modal
      isVisible={visible}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <Container COLOR={COLOR} mode={mode}>
        <CloseButtpn onPress={hideTutorial}>
          <AntDesign name="close" size={24} color={COLOR.Neutral[30]} />
        </CloseButtpn>
        <TutorialCarousel />
      </Container>
      <HideCheckbox onPress={handleCheck}>
        <MaterialCommunityIcons
          name={checked ? "checkbox-marked" : `checkbox-blank-outline`}
          size={20}
          color="white"
        />
        <HideText>다시 보지 않기</HideText>
      </HideCheckbox>
    </Modal>
  );
};

const Container = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.Background.surface
      : props.COLOR.Background.onSurface};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px 20px 0px;
  overflow: hidden;
`;

const HideCheckbox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const HideText = styled.Text`
  color: white;
  margin-left: 5px;
`;

const CloseButtpn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Tutorial;
