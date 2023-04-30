import { useThemeStyle } from "@hooks/useThemeStyle";
import { TEXT_STYLES } from "@style/designSystem";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useState } from "react";
import CustomModal from "@components/popup/modal";

/**
 * 탈퇴하기 스크린의 버튼들
 */
const DeleteButtons = () => {
  const [COLOR, mode] = useThemeStyle();
  const [isModal, setIsModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const removeAccount = () => {
    //TODO 계정 삭제 로직 추가
    setIsModal(false);
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };

  return (
    <Container>
      <Button
        onPress={() => setIsModal(true)}
        style={{
          backgroundColor: `${mode ? COLOR.Neutral[5] : COLOR.Neutral[0]}`,
          marginBottom: 10,
        }}
      >
        <Title style={{ color: COLOR.Text.default }}>모든 기록 삭제하기</Title>
      </Button>
      <Button
        onPress={() => navigation.pop()}
        style={{
          backgroundColor: `${
            mode ? COLOR.Neutral[100] : COLOR.THEME.primary[130]
          }`,
        }}
      >
        <Title style={{ color: COLOR.Text.lighten }}>
          나의 학습 기록 유지하기
        </Title>
      </Button>
      <CustomModal
        visible={isModal}
        title="정말 탈퇴하실건가요?"
        subtitle="지금까지 모은 포인트와 기록은 복구할 수 없어요!"
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
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
`;

export default DeleteButtons;
