import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import ContentLine from "@components/my/Notification";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    available: false,
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
  const [menus, setMenus] = useState<Array<NotificationMenu>>();

  /**
   * 스위치 온오프 함수
   */
  const onSetting = (idx: number) => {
    const newMenus =
      idx === 0
        ? onAllNoti()
        : menus?.map((menu, mdx) =>
            idx === mdx ? { ...menu, available: !menu.available } : menu
          );
    setMenus(newMenus);
    AsyncStorage.setItem("notifications", JSON.stringify(newMenus));
  };

  /**
   * 전체 알림 눌렀을 떄의 함수
   */
  const onAllNoti = () => {
    const making = menus![0].available;
    const newMenus = menus?.map((menu) => {
      return { ...menu, available: !making };
    });
    return newMenus;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const notiInfo = await AsyncStorage.getItem("notifications");
      if (notiInfo) setMenus(JSON.parse(notiInfo));
      else setMenus(MENUS);
    };
    fetchNotifications();
  }, []);

  return (
    <Container COLOR={COLOR}>
      {menus ? (
        menus.map((menu, idx) => (
          <ContentLine
            title={menu.title}
            thumbColor={menu.available ? "#FFFFFF" : "#FFFFFF"}
            onValueChange={() => onSetting(idx)}
            value={menu.available}
            key={menu.title}
          />
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default Notification;
