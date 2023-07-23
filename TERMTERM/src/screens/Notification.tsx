import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import ContentLine from "@components/my/Notification";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // /**
  //  * 스위치 온오프 함수
  //  */
  const onSetting = (idx: number) => {
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

  const autoController = () => {
    const checker =
      menus.quiz.available && menus.repeat.available && menus.today.available;

    if (checker) {
      const newMenus = {
        ...menus,
        all: {
          title: "전체 알림",
          available: true,
        },
      };
      setMenus(newMenus);
      AsyncStorage.setItem("notifications", JSON.stringify(newMenus));
    } else if (!checker && menus.all.available) {
      const newMenus = {
        ...menus,
        all: {
          title: "전체 알림",
          available: false,
        },
      };
      setMenus(newMenus);
      AsyncStorage.setItem("notifications", JSON.stringify(newMenus));
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const notiInfo = await AsyncStorage.getItem("notifications");
      if (notiInfo) setMenus(JSON.parse(notiInfo)); // TODO 최초 접근시 에러 =
      else setMenus({ ...MENUS });
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    autoController();
  }, [menus.quiz.available, menus.repeat.available, menus.today.available]);

  return (
    <Container COLOR={COLOR}>
      <ContentLine
        title={menus.all.title}
        thumbColor={"#FFFFFF"}
        onValueChange={() => onSetting(0)}
        value={menus.all.available}
        key={menus.all.title}
      />
      <ContentLine
        title={menus.today.title}
        thumbColor={"#FFFFFF"}
        onValueChange={() => onSetting(1)}
        value={menus.today.available}
        key={menus.today.title}
      />
      <ContentLine
        title={menus.repeat.title}
        thumbColor={"#FFFFFF"}
        onValueChange={() => onSetting(2)}
        value={menus.repeat.available}
        key={menus.repeat.title}
      />
      <ContentLine
        title={menus.quiz.title}
        thumbColor={"#FFFFFF"}
        onValueChange={() => onSetting(3)}
        value={menus.quiz.available}
        key={menus.quiz.title}
      />
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default Notification;
