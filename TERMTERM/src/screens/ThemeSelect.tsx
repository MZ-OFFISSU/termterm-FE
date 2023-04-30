import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { Radio } from "@components/my/ThemeSelect";

/**
 * 테마 선택 스크린
 */
const ThemeSelect = () => {
  const [COLOR, mode] = useThemeStyle();
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <Container COLOR={COLOR}>
      <Radio
        title="라이트 모드"
        checked={theme}
        onPress={() => setTheme(true)}
      />
      <Radio
        title="다크 모드"
        checked={!theme}
        onPress={() => setTheme(false)}
      />
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default ThemeSelect;
