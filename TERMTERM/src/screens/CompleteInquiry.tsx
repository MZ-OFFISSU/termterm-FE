import styled from "styled-components/native";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

const CompleteInquiry = () => {
  const [width, setWidth] = useState(90);
  const [COLOR, mode] = useThemeStyle();

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(90);
      return;
    }
    if (screenWidth < 500) {
      setWidth(130);
      return;
    }
    if (screenWidth > 500) {
      setWidth(170);
      return;
    }
  };

  useEffect(() => {
    calcWidth();
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOR.Background.surface,
      }}
    >
      <ContentWrapper>
        <AutoSizedImage
          source={require("@assets/bookmark-character.png")}
          width={width}
        />
        <TitleBox>
          <Title>문의가 정상적으로 접수되었습니다.</Title>
          <SubTitle>
            {`더 좋은 경험을 선사하는 termterm이\n될 수 있도록 끊임없이 노력할게요🙌🏻`}
          </SubTitle>
        </TitleBox>
      </ContentWrapper>
    </View>
  );
};

export default CompleteInquiry;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 75px 20px 50px 20px;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Title = styled.Text`
  ${TYPO_STYLE.Body[1].Bold};
  color: ${LIGHT_COLOR_STYLE.Text.active};
  margin-bottom: 5px;
`;

const SubTitle = styled.Text`
  ${TYPO_STYLE.Body[3].Medium};
  color: ${LIGHT_COLOR_STYLE.Text.darken};
  line-height: 25px;
`;
