import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileBox from "@components/my/ProfileBox";
import Button from "@components/my/Button";
import { DefaultList } from "@components/my/MenuList";
import { ProfileProps } from "@interfaces/profile";
import { useEffect, useState } from "react";
import IntroBox from "@components/my/IntroBox";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import MemberApi from "@api/MemberApi";
import { MemberInfo } from "Member";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const My = ({ navigation }: Props) => {
  const memberApi = new MemberApi();

  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState<MemberInfo>(initProfile);

  const getProfileInfo = async (): Promise<MemberInfo> => {
    try {
      const res = await memberApi.getInfo();
      setInfo(res);
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <Container COLOR={COLOR}>
      <InnerContainer style={{ paddingTop: 20, paddingBottom: 20 }}>
        <InnerContainer style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ProfileBox profile={info as MemberInfo} />
          {info?.introduction ? (
            <IntroBox title="자기소개" subtitle={info.introduction} />
          ) : (
            <></>
          )}
          <Button
            title={"프로필 수정"}
            isActivated={false}
            style={{ marginTop: 24 }}
            onPress={() => navigation.push("EditProfile")}
          />
        </InnerContainer>
        <InnerContainer style={{ marginTop: 15 }}>
          <DefaultList />
        </InnerContainer>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default My;

const initProfile: MemberInfo = {
  categories: [],
  domain: "",
  email: "",
  introduction: "",
  job: "",
  memberId: 0,
  name: "",
  nickname: "",
  // TODO : 정책에 따라 포인트 수정해두기
  point: 5000,
  profileImage: "",
  yearCareer: 0,
}