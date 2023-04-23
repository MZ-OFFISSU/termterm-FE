import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileImageSelector from "@components/my/EditProfile/ProfileImageSelector";
import { ProfileProps } from "@interfaces/profile";
import InfoSelector from "@components/my/EditProfile/InfoSelector";
import { useState, useRef } from "react";
import { ScrollView } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

/**
 * 프로필 수정 스크린
 */
const EditProfile = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [profile, setProfile] = useState<ProfileProps>(dummyProfile);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Container ref={scrollViewRef} COLOR={COLOR}>
      <InnerContainer>
        <ProfileImageSelector img={profile.img} />
        <InfoSelector
          profile={profile}
          scrollToBottom={scrollToBottom}
          style={{ marginTop: 35 }}
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
