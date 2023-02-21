import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";

const SOCIAL_TYPE: Record<string, string> = {
  kakao: "#FEE500",
  google: "#FAFAFA",
  apple: "#FAFAFA",
} as const;
type SocialType = keyof typeof SOCIAL_TYPE;

interface Props extends TouchableOpacityProps {
  type: SocialType;
}

/**
 * 소셜로그인 버튼
 * kakao | google | apple
 */
const SocialLoginButton = ({ type, ...props }: Props) => {
  return (
    <ButtonBox type={type} {...props}>
      {type === "kakao" ? (
        <InnerView>
          <AutoSizedImage source={require("@assets/kakao.png")} height={20} />
          <SocialText>카카오톡으로 시작하기</SocialText>
        </InnerView>
      ) : type === "google" ? (
        <InnerView>
          <AutoSizedImage source={require("@assets/google.png")} height={20} />
          <SocialText>Google로 시작하기</SocialText>
        </InnerView>
      ) : type === "apple" ? (
        <InnerView>
          <AutoSizedImage source={require("@assets/apple.png")} height={20} />
          <SocialText>Apple로 시작하기</SocialText>
        </InnerView>
      ) : (
        <></>
      )}
    </ButtonBox>
  );
};

const ButtonBox = styled.TouchableOpacity<{ type: SocialType }>`
  background-color: ${(props) => SOCIAL_TYPE[props.type]};
  width: 85%;
  max-width: 358px;
  height: 45px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const InnerView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #0d0d0d;
`;

const SocialText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #0d0d0d;
  margin-left: 10px;
`;

export default SocialLoginButton;
