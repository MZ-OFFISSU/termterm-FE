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
import { infoState } from "@recoil/signupState";
import { useRecoilState } from "recoil";
import { ModifiedMemberInfo } from "Member";
import { getTypeFromLabel } from "@utils/careerConverter";
import { getAccessToken } from "@utils/tokenHandler";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

/**
 * 프로필 수정 스크린
 */
const EditProfile = ({ navigation }: Props) => {
  const memberApi = new MemberApi();
  const [info, setInfo] = useRecoilState(infoState);

  const [COLOR, mode] = useThemeStyle();
  const [input, setInput] = useState<ProfileProps>(dummyProfile);
  const scrollViewRef = useRef<ScrollView>(null);
  const [changed, setChanged] = useState(false);
  const [warn, setWarn] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const [loading] = useDebounce(
    () => {
      if (JSON.stringify(dummyProfile) !== JSON.stringify(input))
        setChanged(true);
      else setChanged(false);
    },
    JSON.stringify(input),
    500
  );

  const checkWarn = async (): Promise<boolean> => {
    try {
      //닉네임이 중복되지 않음 (사용가능)
      await memberApi.nicknameDoubleCheck(input.name);
      setWarn(false);
      return true;
    } catch (err) {
      //닉네임이 중복됨 (사용불가능)
      setWarn(true);
      return false;
    }
  };

  const editProfileInfo = async () => {
    const modifiedInfo: ModifiedMemberInfo = {
      domain: input.domain,
      introduction: input.intro as string,
      job: input.job,
      nickname: input.name,
      yearCareer: getTypeFromLabel(info.career)!,
    };
    setInfo({
      name: input.name,
      domain: input.domain,
      job: input.job,
      career: input.career,
      interests: input.interests,
    })
    const categories: string[] = input.interests;
    // const access = getAccessToken();

    try {
      // 닉네임 중복 검사
      const check = await checkWarn();
      if (!check) return;

      await memberApi.putInfo(modifiedInfo);
      await memberApi.putCategory(categories);
      // TODO : 프로필 사진 수정 API 추가

      navigation.reset({ routes: [{ name: "My" }] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container ref={scrollViewRef} COLOR={COLOR}>
      <InnerContainer>
        <ProfileImageSelector input={input} setInput={setInput} />
        <InfoSelector
          input={input}
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

const dummyProfile: ProfileProps = {
  name: "왈왈이",
  domain: "비바리퍼블리카",
  job: "프론트엔드 개발자",
  career: "1년 미만",
  interests: ["개발", "디자인", "비즈니스", "IT"],
  img: "https://i.pinimg.com/564x/42/08/6e/42086e93481fff0f923cb0ab0d3784dc.jpg",
  intro:
    "나는야 비바리퍼블리카가 가고 싶은 프론트엔드 개발자입니다.\n우하하하하하 백엔드 싫어~ 엠엘 싫어~",
};
