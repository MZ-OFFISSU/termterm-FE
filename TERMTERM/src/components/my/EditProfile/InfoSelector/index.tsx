import styled from "styled-components/native";
import Wrapper from "./Wrapper";
import { Input } from "@components/index";
import { Dispatch, SetStateAction, useState } from "react";
import { ProfileProps } from "@interfaces/profile";
import { ViewProps } from "react-native";
import { CustomSelector } from "@components/index";
import CustomTextarea from "@components/common/CustomTextarea";
import { JOB_TYPE } from "@screens/Onboarding/Third";
import { JobCard } from "@components/index";
import { screenWidth } from "@style/dimensions";

interface Props extends ViewProps {
  input: ProfileProps;
  setInput: Dispatch<SetStateAction<ProfileProps>>;
  scrollToBottom: () => void;
}

/**
 * 닉네임 / 도메인 / 직업 / 연차 / 자기소개 입력 콘테이너
 */
const InfoSelector = ({ input, setInput, scrollToBottom, ...props }: Props) => {
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
  const [career, setCareer] = useState(input.career);

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
      case "interests":
        if (input.interests.includes(value))
          setInput({
            ...input,
            interests: input.interests.filter((interest) => interest !== value),
          });
        else if (input.interests.length < 4)
          setInput({ ...input, interests: [...input.interests, value] });
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
        <CustomTextarea
          value={input.intro}
          max={100}
          onChangeText={(text) => onChangeInput("intro", text)}
        />
      </Wrapper>
      <Wrapper
        title="관심사"
        subtitle="최소 1개에서 최대 4개까지 선택해주세요."
        style={{ marginTop: 40 }}
      >
        <ButtonContainer>
          {JOB_TYPE.map((job) => (
            <JobCard
              key={job.title}
              isFocused={input.interests.includes(job.title)}
              onPress={() => onChangeInput("interests", job.title)}
              {...job}
            />
          ))}
        </ButtonContainer>
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
const ButtonContainer = styled.View`
  width: ${screenWidth - 32}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  margin-top: 20px;
`;

export default InfoSelector;
