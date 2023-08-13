import { LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { useState, useEffect } from "react";

const Interst: { [key: string]: string } = {
  PM: "기획",
  DESIGN: "디자인",
  IT: "IT",
  MARKETING: "마켓팅",
  BUSINESS: "비즈니스",
  DEVELOPMENT: "개발",
};

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
      case "PM":
        setBg("#F99B49");
        break;
      case "DEVELOPMENT":
        setBg("#AB83FF");
        break;
      case "MARKETING":
        setBg("#76CEFF");
        break;
      case "DESIGN":
        setBg("#F58585");
        break;
      case "BUSINESS":
        setBg("#FF8DCA");
        break;
      case "IT":
        setBg("#FFCA43");
        break;
    }
  }, []);

  return (
    <Badge bg={bg} {...props}>
      <BadgeContent>{Interst[interest]}</BadgeContent>
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
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

export default InterestBadge;
