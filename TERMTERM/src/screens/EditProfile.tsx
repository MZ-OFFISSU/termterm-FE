import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

export type Props = StackScreenProps<RootStackParamList, "EditProfile">;

/**
 * 프로필 수정 스크린
 */
const EditProfile = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container COLOR={COLOR}>
      <InnerContainer></InnerContainer>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 32px;
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default EditProfile;
