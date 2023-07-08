import styled from "styled-components/native";
import { View, ImageSourcePropType } from "react-native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import {
  CustomButton,
  BUTTON_TYPE,
  BUTTON_STATE,
  JobCard,
} from "@components/index";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { Props } from "@interfaces/onboarding";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { infoState } from "@recoil/signupState";

interface JobType {
  title: string;
  img: ImageSourcePropType;
}

export const JOB_TYPE: Array<JobType> = [
  {
    title: "기획",
    img: require("@assets/card/plan.png"),
  },
  {
    title: "마케팅",
    img: require("@assets/card/market.png"),
  },
  {
    title: "개발",
    img: require("@assets/card/develop.png"),
  },
  {
    title: "디자인",
    img: require("@assets/card/design.png"),
  },
  {
    title: "비즈니스",
    img: require("@assets/card/business.png"),
  },
  {
    title: "IT",
    img: require("@assets/card/it.png"),
  },
];

const Third = ({ onEnd }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [info, setInfo] = useRecoilState(infoState);
  const [jobs, setJobs] = useState<Array<string>>([]);

  const selectJob = (job: string) => {
    if (jobs.includes(job)) setJobs(jobs.filter((j) => j !== job));
    else if (jobs.length < 4) setJobs((prev) => [...prev, job]);
  };

  const nextStage = () => {
    if (onEnd && jobs.length > 0) {
      setInfo({
        ...info,
        interests: jobs,
      });
      onEnd();
    }
  };

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 80,
      }}
    >
      <Title>
        나의 <Title style={{ fontWeight: "900" }}>관심사</Title>는?
      </Title>
      <Warning>최소 1개에서 최대 4개까지 선택해주세요.</Warning>
      <ButtonContainer>
        {JOB_TYPE.map((job) => (
          <JobCard
            key={job.title}
            isFocused={jobs.includes(job.title)}
            onPress={() => selectJob(job.title)}
            {...job}
          />
        ))}
      </ButtonContainer>
      <CustomButton
        title="완료"
        theme={theme}
        type={BUTTON_TYPE.primary}
        state={jobs.length === 0 ? BUTTON_STATE.default : BUTTON_STATE.active}
        onPress={() => nextStage()}
        style={{
          width: screenWidth - 32,
          alignSelf: "center",
          position: "absolute",
          bottom: 30,
        }}
      />
    </View>
  );
};

const Title = styled.Text`
  font-size: 21px;
  color: ${LIGHT_COLOR_STYLE.Text.active};
`;

const ButtonContainer = styled.View`
  width: ${screenWidth - 32}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  margin-top: 34px;
`;

const Warning = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${LIGHT_COLOR_STYLE.Text.muted};
  margin-top: 14px;
`;

export default Third;
