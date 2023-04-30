import styled from "styled-components/native";
import { ProfileProps } from "@interfaces/profile";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import InterestBadge from "./InterestBadge";

interface Props {
  profile: ProfileProps;
}

/**
 * 프로필 스크린 최상단 프로필 미리보기 컴포넌트
 */
const ProfileBox = ({ profile }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImage source={{ uri: profile.img }} />
      </ProfileImageWrapper>
      <InfoWrapper>
        <Name COLOR={COLOR}>{profile.name}</Name>
        <DetailWrapper>
          <Detail COLOR={COLOR}>{profile.domain}</Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            |
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            {profile.job}
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            |
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            {profile.career}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          {profile.interests.map((interest, idx) => (
            <InterestBadge
              key={interest}
              interest={interest}
              style={{ marginLeft: idx !== 0 ? 4 : 0 }}
            />
          ))}
        </DetailWrapper>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileImageWrapper = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 5px 0px;
  margin-left: 20px;
`;

const Name = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.xsm.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const DetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Detail = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES["2xsm"].Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
`;

export default ProfileBox;
