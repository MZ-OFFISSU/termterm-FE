import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";
import { MemberInfo } from "Member";

interface Props extends ViewProps {
  input: MemberInfo;
  setInput: Dispatch<SetStateAction<MemberInfo>>;
}

const ProfileImageSelector = ({ input, setInput, ...props }: Props) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.canceled) {
      return null; // 이미지 업로드 취소한 경우
    }
    // 이미지 업로드 결과 및 이미지 경로 업데이트
    setInput({ ...input, profileImage: result.assets[0].uri });
  };

  return (
    <Container onPress={uploadImage} {...props}>
      <ImageContainer>
        <ProfileImage source={{ uri: input.profileImage }} />
      </ImageContainer>
      <CameraWrapper>
        <FontAwesome
          name="camera"
          size={12}
          color={LIGHT_COLOR_STYLE.Neutral[0]}
        />
      </CameraWrapper>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 500px;
  position: relative;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 500px;
  overflow: hidden;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CameraWrapper = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 500px;
  background-color: ${LIGHT_COLOR_STYLE.Neutral[90]};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  right: 0px;
`;

export default ProfileImageSelector;
