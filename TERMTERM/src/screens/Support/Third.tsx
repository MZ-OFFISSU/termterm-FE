import styled from "styled-components/native";
import { View, Keyboard, Text } from "react-native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";

const Third = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [btnPosition, setBtnPosiition] = useState(30);

  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingTop: 80,
      }}
    >
      <Text>Second Inquiry</Text>
    </View>
  );
};

export default Third;
