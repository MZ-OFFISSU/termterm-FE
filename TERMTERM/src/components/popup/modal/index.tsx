import styled from "styled-components/native";
import Modal from "react-native-modal";
import { TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

interface Props {
  visible: boolean;
  title: string;
  subtitle?: string;
  btnTitle: Array<string>;
  onClose?: () => void;
  onNext: () => void;
}

/**
 * 모달창 컴포넌트
 * 그냥 사용만해도 뒷 배경이 흐릿해진다!
 */
const CustomModal = ({
  visible,
  title,
  subtitle,
  btnTitle,
  onClose,
  onNext,
}: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Modal
      isVisible={visible}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <Container COLOR={COLOR} mode={mode}>
        <Title COLOR={COLOR}>{title}</Title>
        {subtitle ? <Subtitle COLOR={COLOR}>{subtitle}</Subtitle> : <></>}
        {btnTitle.length === 2 && onClose ? (
          <BtnWrapper>
            <Button
              style={{ backgroundColor: COLOR.Neutral[30] }}
              onPress={() => onClose()}
            >
              <ButtonTitle>{btnTitle[0]}</ButtonTitle>
            </Button>
            <Button
              style={{
                backgroundColor: COLOR.THEME.primary[130],
                marginLeft: 8,
              }}
              onPress={() => onNext()}
            >
              <ButtonTitle>{btnTitle[1]}</ButtonTitle>
            </Button>
          </BtnWrapper>
        ) : (
          <OneButton
            style={{
              backgroundColor: COLOR.THEME.primary[130],
            }}
            onPress={() => onNext()}
          >
            <ButtonTitle>{btnTitle[0]}</ButtonTitle>
          </OneButton>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  max-height: 202px;
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.Background.surface
      : props.COLOR.Background.onSurface};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px 20px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xsm.Reg?.fontSize}rem;
  font-weight: ${TEXT_STYLES.xsm.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
  white-space: pre-line;
  text-align: center;
  margin-top: 10px;
`;

const BtnWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const Button = styled.TouchableOpacity`
  width: 140px;
  height: 44px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OneButton = styled.TouchableOpacity`
  width: 90%;
  height: 44px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const ButtonTitle = styled.Text`
  font-size: ${TEXT_STYLES.xsm.Md?.fontSize}rem;
  font-weight: ${TEXT_STYLES.xsm.Md?.fontWeight};
  color: white;
`;

export default CustomModal;
