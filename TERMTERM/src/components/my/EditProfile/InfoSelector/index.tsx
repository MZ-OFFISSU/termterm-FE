import styled from "styled-components/native";
import Wrapper from "./Wrapper";
import { Input } from "@components/index";
import { useState } from "react";
import { ProfileProps } from "@interfaces/profile";
import { ViewProps } from "react-native";
import { CustomSelector } from "@components/index";
import CustomTextarea from "@components/common/CustomTextarea";

interface Props extends ViewProps {
  profile: ProfileProps;
}

/**
 * 닉네임 / 도메인 / 직업 / 연차 / 자기소개 입력 콘테이너
 */
const InfoSelector = ({ profile, ...props }: Props) => {
  const [input, setInput] = useState<ProfileProps>(profile);

  // 연차 세팅 관련 상태들
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "신입", value: "신입" },
    { label: "1년 미만", value: "1년 미만" },
    { label: "1년 이상 2년 미만", value: "1년 이상 2년 미만" },
    { label: "2년 이상 3년 미만", value: "2년 이상 3년 미만" },
    { label: "3년 이상 4년 미만", value: "3년 이상 4년 미만" },
    { label: "4년 이상 5년 미만", value: "4년 이상 5년 미만" },
    { label: "5년 이상", value: "5년 이상" },
    { label: "시니어", value: "시니어" },
  ]);
  const [career, setCareer] = useState(profile.career);

  const onChangeInput = (name: string, value: string) => {
    switch (name) {
      case "name":
        setInput({ ...input, name: value });
        break;
      case "domain":
        setInput({ ...input, domain: value });
        break;
      case "job":
        setInput({ ...input, job: value });
        break;
      case "intro":
        setInput({ ...input, intro: value });
        break;
      default:
        break;
    }
  };

  return (
    <Container {...props}>
      <Wrapper title="닉네임">
        <Input
          value={input.name}
          max={20}
          inevitable={true}
          onChangeText={(text) => onChangeInput("name", text)}
        />
      </Wrapper>
      <Wrapper title="도메인" style={{ marginTop: 35 }}>
        <Input
          value={input.domain}
          max={20}
          inevitable={true}
          onChangeText={(text) => onChangeInput("domain", text)}
        />
      </Wrapper>
      <Wrapper title="직업" style={{ marginTop: 35 }}>
        <Input
          value={input.job}
          max={20}
          inevitable={true}
          onChangeText={(text) => onChangeInput("job", text)}
        />
      </Wrapper>
      <Wrapper title="연차" style={{ marginTop: 35 }}>
        <CustomSelector
          open={open}
          value={career}
          items={items}
          setOpen={setOpen}
          setValue={setCareer}
          setItems={setItems}
          placeholder="연차를 선택해주세요."
          listMode="MODAL"
          modalProps={{
            animationType: "fade",
          }}
          modalTitle="연차를 선택해주세요."
        />
      </Wrapper>
      <Wrapper title="자기소개" style={{ marginTop: 40 }}>
        <CustomTextarea value={profile.intro} max={100} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default InfoSelector;
