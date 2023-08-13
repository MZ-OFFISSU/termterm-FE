import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileImageSelector from "@components/my/EditProfile/ProfileImageSelector";
import InfoSelector from "@components/my/EditProfile/InfoSelector";
import { useState, useRef } from "react";
import { ScrollView } from "react-native";
import { CustomButton } from "@components/index";
import { BUTTON_STATE, BUTTON_TYPE } from "@components/index";
import { useDebounce } from "@hooks/useDebounce";
import { screenWidth } from "@style/dimensions";
import { useProfile } from "@hooks/useProfile";
import { MemberInfo } from "Member";
import { getLabelFromType } from "@utils/careerConverter";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

/**
 * 프로필 수정 스크린
 */
const EditProfile = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { profileInfo, saveInfo } = useProfile();
  const [input, setInput] = useState<MemberInfo>(profileInfo);
  const scrollViewRef = useRef<ScrollView>(null);
  const [changed, setChanged] = useState(false);
  const [career, setCareer] = useState(getLabelFromType(input.yearCareer));

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const [loading] = useDebounce(
    () => {
      if (JSON.stringify(profileInfo) !== JSON.stringify(input))
        setChanged(true);
      else setChanged(false);
    },
    JSON.stringify(input),
    500
  );

  const handleBack = () => {
    navigation.pop();
  };

  return (
    <Container ref={scrollViewRef} COLOR={COLOR}>
      <InnerContainer>
        <ProfileImageSelector input={input} setInput={setInput} />
        <InfoSelector
          input={input}
          setInput={setInput}
          scrollToBottom={scrollToBottom}
          career={career!}
          setCareer={setCareer}
          style={{ marginTop: 35 }}
        />
        <CustomButton
          title="완료"
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={
            loading
              ? BUTTON_STATE.loading
              : changed
              ? BUTTON_STATE.active
              : BUTTON_STATE.default
          }
          onPress={async () => await saveInfo(input, career!, handleBack)}
          style={{
            width: screenWidth - 32,
            alignSelf: "center",
            marginTop: 50,
            marginBottom: 30,
          }}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 32px;
`;

export default EditProfile;
