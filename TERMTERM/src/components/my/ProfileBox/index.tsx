import styled from "styled-components/native";
import { ProfileProps } from "@interfaces/profile";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import InterestBadge from "./InterestBadge";
import { MemberInfo } from "Member";

interface Props {
  profile: MemberInfo;
}

/**
 * 프로필 스크린 최상단 프로필 미리보기 컴포넌트
 */
const ProfileBox = ({ profile }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <ProfileImageWrapper>
        {/* TODO : Profile 이미지 API 연결 */}
        {/* <ProfileImage source={{ uri: profile.profileImage }} /> */}
      </ProfileImageWrapper>
      <InfoWrapper>
        <Name COLOR={COLOR}>
          {profile.name}님 | {profile.job}
        </Name>
        <DetailWrapper>
          <Detail COLOR={COLOR}>{profile.domain}</Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            |
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            {/* TODO : yearCareea 수정한 내용 반영 */}
            {profile.yearCareer == null ? "1년 미만" : profile.yearCareer}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          {profile.categories.map((interest, idx) => (
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
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const DetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Detail = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Regular};
  color: ${(props) => props.COLOR.Text.default};
`;

export default ProfileBox;
