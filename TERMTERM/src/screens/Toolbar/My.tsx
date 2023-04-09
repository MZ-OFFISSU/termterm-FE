import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import ProfileBox from "@components/my/ProfileBox";
import Button from "@components/my/Button";
import { DefaultList } from "@components/my/MenuList";
import { ProfileProps } from "@interfaces/profile";
import { useState } from "react";
import IntroBox from "@components/my/IntroBox";

const My = () => {
  const [COLOR, mode] = useThemeStyle();
  const [info, setInfo] = useState(dummyProfile);

  return (
    <Container COLOR={COLOR}>
      <InnerContainer style={{ paddingTop: 20, paddingBottom: 20 }}>
        <InnerContainer style={{ paddingLeft: 16, paddingRight: 16 }}>
          <ProfileBox profile={info} />
          {info.intro ? (
            <IntroBox title="자기소개" subtitle={info.intro} />
          ) : (
            <></>
          )}
          <Button
            title={"프로필 수정"}
            isActivated={false}
            style={{ marginTop: 30 }}
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
