import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { LIGHT_COLOR_STYLE, TYPO_STYLE, colorTheme } from "@style/designSystem";
import { Radio } from "@components/my/ThemeSelect";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useEffect, useState } from "react";
import { BUTTON_STATE, BUTTON_TYPE, CustomButton } from "@components/index";
import { screenWidth } from "@style/dimensions";
import CustomTextarea from "@components/common/CustomTextarea";
import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";
import CommentApi from "@api/CommentApi";
import { Report, ReportType } from "Comment";
import { useComment } from "@hooks/useComment";

export type Props = StackScreenProps<RootStackParamList, "ReportWord">;

/**
 * 의견 신고 스크린
 */
const ReportWord = ({ route, navigation }: Props) => {
  const { registerReport, reportCategories } = useComment();
  const [COLOR, mode] = useThemeStyle();
  const [reasonType, setReasonType] = useState(reportCategories);
  const [selectedReason, setSelectedReason] = useState("");
  const [etc, setEtc] = useState("");
  const [btnPosition, setBtnPosition] = useState(70);

  const customRadioStyle = {
    borderBottomWidth: 0,
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 0,
  };

  const editETC = (value: string) => {
    setEtc(value);
  };

  //토스트메시지 보여주는 함수
  const showToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "신고가 완료되었어요!\n더 좋은 경험을 제공하는 termterm이 될게요!",
    });
  };

  // 신고가 가능한 상태인지 검사
  const testInvalid = (): boolean => {
    if (selectedReason === "OTHER" && etc !== "") return true;
    if (selectedReason === "OTHER" && etc === "") return false;
    if (selectedReason !== "") return true;
    return false;
  };

  const report = () => {
    const reportInfo: Report = {
      commentId: route.params.id,
      content: etc,
      type: selectedReason as ReportType,
    };
    if (testInvalid()) {
      showToast();
      registerReport(reportInfo);
      return;
    }
  };

  const RenderRadio = (reason: { label: string; value: string }) => {
    return (
      <Radio
        title={reason.label}
        checked={selectedReason === reason.value}
        onPress={() => setSelectedReason(reason.value)}
        style={customRadioStyle}
        key={reason.value}
      />
    );
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setBtnPosition(40 + e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setBtnPosition(70);
    });

    showSubscription;
    hideSubscription;
  }, []);

  return (
    <Container COLOR={COLOR}>
      <DynamicTitleBox />
      {reasonType.map(RenderRadio)}
      {selectedReason === "OTHER" ? (
        <CustomTextarea
          value={etc}
          max={300}
          onChangeText={editETC}
          placeholder="기타 사유를 작성해주세요."
        />
      ) : (
        <></>
      )}
      <CustomButton
        title="신고하기"
        theme={mode}
        state={
          mode
            ? testInvalid()
              ? BUTTON_STATE.active
              : BUTTON_STATE.disabled
            : testInvalid()
            ? BUTTON_STATE.active
            : BUTTON_STATE.default
        }
        type={BUTTON_TYPE.primary}
        onPress={() => report()}
        style={{
          width: screenWidth - 32,
          alignSelf: "center",
          marginTop: 40,
          marginBottom: btnPosition,
        }}
      />
    </Container>
  );
};

/** 타이틀 박스... 테마에 따라 모양이 아예달라짐 */
const DynamicTitleBox = () => {
  const [COLOR, mode] = useThemeStyle();

  const lighten = {
    color: COLOR.Text.lighten,
  };

  const primary = {
    color: COLOR.THEME.primary[100],
  };

  const darken = {
    color: COLOR.Text.darken,
  };

  const LightTitle = () => {
    return (
      <LightTitleWrapper>
        <TitleObjet />
        <Title COLOR={COLOR}>신고 사유를 선택해주세요.</Title>
      </LightTitleWrapper>
    );
  };

  const DarkTitle = () => {
    return (
      <Title COLOR={COLOR}>
        <Title COLOR={COLOR} style={primary}>
          신고 사유
        </Title>
        를 선택해주세요
      </Title>
    );
  };

  return (
    <TitleWrapper>
      {mode ? <LightTitle /> : <DarkTitle />}
      <Subtitle
        style={mode ? darken : lighten}
      >{`텀텀 용어 운영 정책을 위반한\n무분별한 신고는 제재를 받을 수 있습니다.`}</Subtitle>
    </TitleWrapper>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 32px;
  position: relative;
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const LightTitleWrapper = styled.View`
  position: relative;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].ExtraBold};
  text-align: start;
  color: ${(props) => props.COLOR.Text.active};
`;

const TitleObjet = styled.View`
  position: absolute;
  width: 189px;
  height: 10px;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[100]};
  left: 0px;
  bottom: 0px;
`;

const Subtitle = styled.Text`
  ${TYPO_STYLE.Subheading[1].Regular};
  white-space: pre-line;
  margin-top: 16px;
  line-height: 22px;
`;

export default ReportWord;
