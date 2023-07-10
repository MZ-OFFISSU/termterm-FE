import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import styled from "styled-components/native";
import { JOB_TYPE } from "./Onboarding/Third";
import {
  BUTTON_STATE,
  BUTTON_TYPE,
  CustomButton,
  JobCard,
} from "@components/index";
import { useFilter } from "@hooks/useFilter";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

const FilterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [COLOR, mode] = useThemeStyle();
  const { dynamicFilterArr, settingFilter, saveFilter } = useFilter();

  const save = () => {
    saveFilter();
    navigation.pop();
  };

  const btnConfig = {
    title: "적용",
    theme: mode,
    type: BUTTON_TYPE.primary,
    state:
      dynamicFilterArr.length > 0 ? BUTTON_STATE.active : BUTTON_STATE.default,
  };

  return (
    <Container COLOR={COLOR}>
      <TitleWrapper>
        <Heading COLOR={COLOR}>
          {`용어 `}
          <HeadingBold>카테고리</HeadingBold>
        </Heading>
        <Content COLOR={COLOR}>
          찾고 싶은 용어의 카테고리를 선택해주세요.
        </Content>
      </TitleWrapper>
      <ButtonContainer>
        {JOB_TYPE.map((job) => (
          <JobCard
            key={job.title}
            isFocused={dynamicFilterArr.includes(job.title)}
            onPress={() => settingFilter(job.title)}
            {...job}
          />
        ))}
      </ButtonContainer>
      <CustomButton style={styles.button} onPress={save} {...btnConfig} />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  flex: 1;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 35px;
`;

const Heading = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Heading[3].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

const HeadingBold = styled.Text`
  ${TYPO_STYLE.Heading[3].Bold};
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.active};
  white-space: pre-line;
  text-align: center;
  margin-top: 14px;
`;

const ButtonContainer = styled.View`
  width: ${screenWidth - 32}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  margin-top: 34px;
`;

const styles = StyleSheet.create({
  button: {
    width: screenWidth - 32,
    marginTop: 50,
    alignSelf: "center",
  },
});

export default FilterScreen;
