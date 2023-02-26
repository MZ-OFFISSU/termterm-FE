import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Onboarding/index";
import { NavigationBar } from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";

const STAGES = [First, Second, Third] as const;

const Onboarding = () => {
  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "white" }}>
      <Wrapper>
        <NavigationBar>
          <AntDesign name="left" size={16} color="black" />
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
