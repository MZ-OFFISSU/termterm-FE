import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

interface Props extends ViewProps {
  img: string;
}

const ProfileImageSelector = ({ img, ...props }: Props) => {
  return (
    <Container {...props}>
      <ImageContainer>
        <ProfileImage source={{ uri: img }} />
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
