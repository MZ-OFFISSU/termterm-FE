import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { ViewProps } from "react-native";
import { TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props extends ViewProps {
  title: string;
  subtitle: string;
}

/**
 * 아카이브 폴더랑 폴더 내부 단어에서 현재 어떤 폴더인지 알려주는 컴포넌트
 */
const FolderInfo = ({ title, subtitle, ...props }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <Container {...props}>
      <AutoSizedImage
        source={require("@assets/icon/CurFolder.png")}
        width={15.75}
      />
      <Text style={{ color: COLOR.Text.default, marginLeft: 6 }}>{title}</Text>
      <Text style={{ color: COLOR.Text.muted, marginLeft: 6 }}>{subtitle}</Text>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.Text`
  ${TYPO_STYLE.Caption[1].Medium};
`;

export default FolderInfo;
