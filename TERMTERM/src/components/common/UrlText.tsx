import styled from "styled-components/native";
import { TouchableOpacity, TextProps, Linking } from "react-native";

interface Props extends TextProps {
  /**텍스트 */
  text: string;
  /**삽입될 url */
  url: string;
  underline?: boolean;
}

/**url이 삽입되어, 클릭시 해당 url로 이동하는 텍스트 컴포넌트 */
const UrlText = ({ text, url, underline, ...props }: Props) => {
  const openURL = () => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle URL: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <TouchableOpacity onPress={openURL}>
      <Url underline={underline || false} {...props}>
        {text}
      </Url>
    </TouchableOpacity>
  );
};

const Url = styled.Text<{ underline: boolean }>`
  text-decoration-line: ${(props) => (props.underline ? "underline" : "none")};
  text-align: center;
  white-space: pre-line;
  font-size: 12px;
  font-weight: 500;
  color: #6e7277;
`;

export const NonUrl = styled.Text`
  text-align: center;
  white-space: pre-line;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #6e7277;
`;

export default UrlText;
