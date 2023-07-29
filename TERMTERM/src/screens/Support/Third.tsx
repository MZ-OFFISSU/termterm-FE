import styled from "styled-components/native";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

const Third = () => {
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(90);

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
      }}
    >
      <ContentWrapper>
        <AutoSizedImage
          source={require("@assets/bookmark-character.png")}
          width={width}
        />
        <TitleBox>
          <Title COLOR={COLOR} mode={mode}>
            문의가 정상적으로 접수되었습니다.
          </Title>
          <SubTitle COLOR={COLOR} mode={mode}>
            {`더 좋은 경험을 선사하는 termterm이\n될 수 있도록 끊임없이 노력할게요 🙌🏻`}
          </SubTitle>
        </TitleBox>
      </ContentWrapper>
    </View>
  );
};

export default Third;

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

const Title = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Body[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-bottom: 5px;
`;

const SubTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Body[3].Regular};
  color: ${(props) => props.mode ?  props.COLOR.Text.darken : props.COLOR.Text.lighten};
  line-height: 30px;
`;
