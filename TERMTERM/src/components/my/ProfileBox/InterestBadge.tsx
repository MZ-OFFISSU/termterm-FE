import { LIGHT_COLOR_STYLE, TEXT_STYLES } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { useState, useEffect } from "react";

enum Interst {
  PM = "기획",
  Design = "디자인",
  IT = "IT",
  Marketing = "마켓팅",
  Business = "비즈니스",
  Develop = "개발",
}

interface Props extends ViewProps {
  interest: string;
}

/**
 * 관심분야 뱃지
 * 배경색 자동 설정됨
 */
const InterestBadge = ({ interest, ...props }: Props) => {
  const [bg, setBg] = useState("");

  useEffect(() => {
    switch (interest) {
      case Interst.PM:
        setBg("#F99B49");
        break;
      case Interst.Develop:
        setBg("#AB83FF");
        break;
      case Interst.Marketing:
        setBg("#76CEFF");
        break;
      case Interst.Design:
        setBg("#F58585");
        break;
      case Interst.Business:
        setBg("#FF8DCA");
        break;
      case Interst.IT:
        setBg("#FFCA43");
        break;
    }
  }, []);

  return (
    <Badge bg={bg} {...props}>
      <BadgeContent>{interest}</BadgeContent>
    </Badge>
  );
};

const Badge = styled.View<{ bg: string }>`
  height: 20px;
  padding: 1px 13px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bg};
`;

const BadgeContent = styled.Text`
  font-size: ${TEXT_STYLES["2xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].Md?.fontWeight};
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

export default InterestBadge;
