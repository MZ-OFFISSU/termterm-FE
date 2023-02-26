import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Onboarding/index";
import {
  NavigationBar,
  NavigatorTitle,
  NavigatorPager,
  CaretBtn,
} from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { useState } from "react";

const STAGES = [First, Second, Third] as const;

const Onboarding = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [COLOR] = useThemeStyle(theme);
  const [curIdx, setCurIdx] = useState(0);

  return (
    <SafeAreaView
      style={{ flex: 0, backgroundColor: COLOR.Background.surface }}
    >
      <Wrapper>
        <NavigationBar
          style={{
            paddingLeft: 17,
            paddingRight: 17,
            justifyContent: "space-between",
          }}
        >
          <CaretBtn>
            <AntDesign name="left" size={20} color={COLOR.Text.active} />
          </CaretBtn>
          <NavigatorTitle style={{ color: COLOR.Text.active }}>
            회원가입
          </NavigatorTitle>
          <NavigatorPager style={{ color: COLOR.Text.active }}>
            {curIdx + 1} / 3
          </NavigatorPager>
        </NavigationBar>
        <></>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export default Onboarding;
