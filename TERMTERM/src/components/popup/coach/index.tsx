import styled from "styled-components/native";
import Modal from "react-native-modal";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CoachType } from "@hooks/useCoach";
import Fold from "./Fold";
import CoachBackground from "./CoachBackground";

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

  console.log(type);

  return (
    <Modal
      isVisible={isOpen}
      customBackdrop={CoachBackground({ type })}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <CloseButtpn onPress={() => hideCoach(type, checked)}>
        <AntDesign name="close" size={24} color={COLOR.Neutral[30]} />
      </CloseButtpn>
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

const HideCheckbox = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 70px;
`;

const HideText = styled.Text`
  color: white;
  margin-left: 5px;
`;

const CloseButtpn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export default Coachmark;
