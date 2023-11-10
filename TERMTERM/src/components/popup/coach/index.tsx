import styled from "styled-components/native";
import Modal from "react-native-modal";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CoachType } from "@hooks/useCoach";
import CoachBackground from "./CoachBackground";
import { screenHeight } from "@style/dimensions";

interface Props {
  type: CoachType;
  isOpen: boolean;
  checked: boolean;
  handleCheck: () => void;
  hideCoach: (type: CoachType, hide: boolean) => void;
}

/**
 * 코치마크 컴포넌트
 */
const Coachmark = ({
  type,
  isOpen,
  checked,
  handleCheck,
  hideCoach,
}: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Modal
      isVisible={isOpen}
      customBackdrop={CoachBackground({ type })}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <CloseWrapper up={type === "comment"}>
        <HideCheckbox onPress={handleCheck}>
          <MaterialCommunityIcons
            name={checked ? "checkbox-marked" : `checkbox-blank-outline`}
            size={20}
            color="white"
          />
          <HideText>다시 보지 않기</HideText>
        </HideCheckbox>
        <CloseButton onPress={() => hideCoach(type, checked)}>
          <AntDesign name="close" size={24} color={COLOR.Neutral[30]} />
        </CloseButton>
      </CloseWrapper>
    </Modal>
  );
};

const CloseWrapper = styled.View<{ up: boolean }>`
  width: 100%;
  position: absolute;
  bottom: ${(props) => (props.up ? `${screenHeight - 100}px` : "70px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HideCheckbox = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HideText = styled.Text`
  color: white;
  margin-left: 5px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5b5b5b36;
  border-radius: 10px;
  margin-top: 30px;
`;

export default Coachmark;
