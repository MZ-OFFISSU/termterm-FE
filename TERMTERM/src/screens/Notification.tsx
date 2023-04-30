import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import ContentLine from "@components/my/Notification";
import { useState } from "react";

interface NotificationMenu {
  title: string;
  available: boolean;
}

const MENUS: Array<NotificationMenu> = [
  {
    title: "전체 알림",
    available: false,
  },
  {
    title: "오늘의 용어",
    available: true,
  },
  {
    title: "복습",
    available: false,
  },
  {
    title: "데일리 용어 퀴즈",
    available: false,
  },
];

/**
 * 마이페이지 -> 알람설정 스크린
 */
const Notification = () => {
  const [COLOR, mode] = useThemeStyle();
  const [menus, setMenus] = useState(MENUS);

  const onSetting = (idx: number) => {
    const newMenus = menus.map((menu, mdx) =>
      idx === mdx ? { ...menu, available: !menu.available } : menu
    );
    setMenus(newMenus);
  };

  return (
    <Container COLOR={COLOR}>
      {menus.map((menu, idx) => (
        <ContentLine
          title={menu.title}
          thumbColor={menu.available ? "#FFFFFF" : "#FFFFFF"}
          onValueChange={() => onSetting(idx)}
          value={menu.available}
          key={menu.title}
        />
      ))}
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default Notification;
