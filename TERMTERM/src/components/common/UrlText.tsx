import styled from "styled-components/native";
import { TextToken } from "../../style/textToken";

interface Props {
  /**텍스트 */
  text: string;
  /**삽입될 url */
  url: string;
  /**디자인 토큰 */
  token: TextToken;
  /**색상 */
  color: string;
}

/**url이 삽입되어, 클릭시 해당 url로 이동하는 텍스트 컴포넌트 */
const UrlText = ({ text, url, token, color }: Props) => {
  return <Url token={token}>dd</Url>;
};

const Url = styled.Text<{ token: TextToken }>`
  cursor: pointer;
  font-size: ${(props) => props.token.fontSize};
  font-weight: ${(props) => props.token.fontWeight};
`;

export default UrlText;
