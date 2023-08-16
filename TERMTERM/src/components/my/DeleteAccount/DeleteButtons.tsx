import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useState } from "react";
import CustomModal from "@components/popup/modal";
import { useHaptics } from "@hooks/useHaptics";
import { useProfile } from "@hooks/useProfile";

/**
 * 탈퇴하기 스크린의 버튼들
 */
const DeleteButtons = () => {
  const { haptic } = useHaptics();
  const [COLOR, mode] = useThemeStyle();
  const [isModal, setIsModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { removeMember, removeToast } = useProfile();

  const removeAccount = async () => {
    try {
      await removeMember();
      setIsModal(false);
      haptic("warning");
      removeToast();
      navigation.reset({
        routes: [{ name: "Login", params: { nonAuto: true } }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Button
        onPress={() => navigation.pop()}
        style={{
          backgroundColor: `${
            mode ? COLOR.Neutral[100] : COLOR.THEME.primary[130]
          }`,
          marginBottom: 10,
        }}
      >
        <Title style={{ color: COLOR.Text.lighten }}>
          나의 학습 기록 유지하기
        </Title>
      </Button>
      <Button
        onPress={() => setIsModal(true)}
        style={{
          backgroundColor: `${mode ? COLOR.Neutral[5] : COLOR.Neutral[0]}`,
        }}
      >
        <Title style={{ color: COLOR.Text.default }}>
          모든 기록 삭제하고 탈퇴하기
        </Title>
      </Button>
      <CustomModal
        visible={isModal}
        title="탈퇴 시 주의사항을 한 번 더 확인해주세요."
        subtitle={`탈퇴 시 계정의 모든 정보와 학습 기록,\n포인트가 완전히 사라지며 복구할 수 없어요.\n단, 서비스 이용 시 작성한 용어 설명은\n삭제되지 않아요.`}
        btnTitle={["취소", "탈퇴하기"]}
        onClose={() => setIsModal(false)}
        onNext={() => removeAccount()}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 47px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  ${TYPO_STYLE.Body[2].SemiBold};
`;

export default DeleteButtons;
