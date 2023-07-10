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

const MENUS = {
  all: {
    title: "전체 알림",
    available: false,
  },
  today: {
    title: "오늘의 용어",
    available: false,
  },
  repeat: {
    title: "복습",
    available: false,
  },
  quiz: {
    title: "Daily 용어 퀴즈",
    available: false,
  },
};

/**
 * 마이페이지 -> 알람설정 스크린
 */
const Notification = () => {
  const [COLOR, mode] = useThemeStyle();
  const [menus, setMenus] = useState(MENUS);

  console.log(menus);

  /**
   * 스위치 온오프 함수
   */
  const onSetting = (idx: number) => {
    if (!menus || !menus.repeat || !menus.quiz || !menus.today) return;

    const newMenus = idx === 0 ? onAllNoti() : settingSwitch(idx);
    setMenus(newMenus);
    AsyncStorage.setItem("notifications", JSON.stringify(newMenus));
  };

  /**
   * 전체 알림 눌렀을 떄의 함수
   */
  const onAllNoti = () => {
    const making = !menus.all.available;
    const newMenus = {
      all: {
        title: "전체 알림",
        available: making,
      },
      today: {
        title: "오늘의 용어",
        available: making,
      },
      repeat: {
        title: "복습",
        available: making,
      },
      quiz: {
        title: "Daily 용어 퀴즈",
        available: making,
      },
    };
    return newMenus;
  };

  const settingSwitch = (idx: number) => {
    let newMenus = menus;
    switch (idx) {
      case 0:
        break;
      case 1:
        newMenus = {
          ...menus,
          today: {
            title: "오늘의 용어",
            available: !menus.today.available,
          },
        };
        break;
      case 2:
        newMenus = {
          ...menus,
          repeat: {
            title: "복습",
            available: !menus.repeat.available,
          },
        };
        break;
      case 3:
        newMenus = {
          ...menus,
          quiz: {
            title: "Daily 용어 퀴즈",
            available: !menus.quiz.available,
          },
        };
        break;
    }
    return newMenus;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const notiInfo = await AsyncStorage.getItem("notifications");
      if (notiInfo) setMenus(JSON.parse(notiInfo));
      else setMenus({ ...MENUS });
    };
    fetchNotifications();
  }, []);

  return (
    <Container COLOR={COLOR}>
      {menus ? (
        Object.values(menus).map((menu, idx) => (
          <ContentLine
            title={menu.title}
            thumbColor={"#FFFFFF"}
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
