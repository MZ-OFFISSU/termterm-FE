import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileBox from "@components/my/ProfileBox";
import Button from "@components/my/Button";
import { DefaultList } from "@components/my/MenuList";
import IntroBox from "@components/my/IntroBox";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { MemberInfo } from "Member";
import { useProfile } from "@hooks/useProfile";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const My = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { getProfileInfo, profileInfo } = useProfile();
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      await getProfileInfo();
      setRefresh(false);
    } catch (err) {
      setTimeout(() => {
        setRefresh(false);
      }, 2000);
    }
  }, []);

  return (
    <Container
      COLOR={COLOR}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
      <InnerContainer style={{ paddingTop: 20, paddingBottom: 20 }}>
        <InnerContainer style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ProfileBox profile={profileInfo} />
          {profileInfo?.introduction && (
            <IntroBox title="자기소개" subtitle={profileInfo.introduction} />
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
