import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileImageSelector from "@components/my/EditProfile/ProfileImageSelector";
import { ProfileProps } from "@interfaces/profile";
import InfoSelector from "@components/my/EditProfile/InfoSelector";
import { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import { CustomButton } from "@components/index";
import { BUTTON_STATE, BUTTON_TYPE } from "@components/index";
import { useDebounce } from "@hooks/useDebounce";
import { screenWidth } from "@style/dimensions";
import MemberApi from "@api/MemberApi";
import { ProfileInfo, profileState } from "@recoil/signupState";
import { useRecoilValue } from "recoil";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

/**
 * 프로필 수정 스크린
 */
const EditProfile = ({ navigation }: Props) => {
  const memberApi = new MemberApi();

  const [COLOR, mode] = useThemeStyle();
  const currProfile = useRecoilValue(profileState);
  const [input, setInput] = useState<ProfileProps>({
    name: currProfile.nickname,
    domain: currProfile.domain,
    job: currProfile.job,
    // TODO : career 값 변환 num to str
    career: "",
    interests: [],
    img: "",
    intro: currProfile.introduction,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const [changed, setChanged] = useState(false);
  const [warn, setWarn] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const [loading] = useDebounce(
    () => {
      if (JSON.stringify(currProfile) !== JSON.stringify(input))
        setChanged(true);
      else setChanged(false);
    },
    JSON.stringify(input),
    500
  );

  const checkWarn = async (): Promise<boolean> => {
    try {
      //닉네임이 중복되지 않음 (사용가능)
      await memberApi.nicknameDoubleCheck(input?.name);
      setWarn(false);
      return true;
    } catch (err) {
      //닉네임이 중복됨 (사용불가능)
      setWarn(true);
      return false;
    }
  };

  const editProfileInfo = async () => {
    try {
      // 닉네임 중복 검사
      const check = await checkWarn();
      if (!check) return;

      await memberApi.putInfo({
        domain: input.domain,
        introduction: currProfile.introduction,
        job: input.job,
        nickname: input.name,
        // TODO : 연차 코드 수정
        yearCareer: currProfile.yearCareer == null ? 1 : 0,
      });
      // await memberApi.putCategory(categories);
      // TODO : 프로필 사진 수정 API 추가

      navigation.reset({ routes: [{ name: "My" }] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container ref={scrollViewRef} COLOR={COLOR}>
      <InnerContainer>
        <ProfileImageSelector
          input={input as ProfileProps}
          setInput={setInput}
        />
        <InfoSelector
          input={input as ProfileProps}
          setInput={setInput}
          scrollToBottom={scrollToBottom}
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
          onPress={() => editProfileInfo()}
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

const dummyProfile: ProfileInfo = {
  domain: "비바리퍼블리카",
  introduction: "안녕하세요. 유짐인입니다",
  job: "프론트엔드 개발자",
  nickname: "짐프짐프",
  yearCareer: 1,
};
