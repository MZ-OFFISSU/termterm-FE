import styled from "styled-components/native";
import { ProfileProps } from "@interfaces/profile";
import { useState } from "react";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import InterestBadge from "./InterestBadge";

/**
 * 프로필 스크린 최상단 프로필 미리보기 컴포넌트
 */
const ProfileBox = () => {
  const [info, setInfo] = useState(dummyProfile);
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImage source={{ uri: info.img }} />
      </ProfileImageWrapper>
      <InfoWrapper>
        <Name COLOR={COLOR}>{info.name}</Name>
        <DetailWrapper>
          <Detail COLOR={COLOR}>{info.domain}</Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            |
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            {info.job}
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            |
          </Detail>
          <Detail COLOR={COLOR} style={{ marginLeft: 4 }}>
            {info.career}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          {info.interests.map((interest, idx) => (
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

const dummyProfile: ProfileProps = {
  name: "왈왈이",
  domain: "비바리퍼블리카",
  job: "프론트엔드 개발자",
  career: "1년 미만",
  interests: ["개발", "디자인", "비즈니스", "IT"],
  img: "https://i.pinimg.com/564x/42/08/6e/42086e93481fff0f923cb0ab0d3784dc.jpg",
};
