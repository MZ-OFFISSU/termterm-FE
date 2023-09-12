import * as Notifications from "expo-notifications";

export const useNotification = () => {
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        provideAppNotificationSettings: true,
      },
      android: {
        importance: Notifications.AndroidImportance.MAX,
        // priority: Notifications.AndroidPriority.HIGH,
      },
    });

    if (status !== "granted") {
      alert("설정에서 알림 상태를 변경할 수 있습니다.");
      return false;
    }
    return true;
  };

  const scheduleNotification = (hours: number, minutes: number) => {
    const now = new Date();
    const nextNotification = new Date();

    nextNotification.setHours(hours, minutes, 0);

    if (now > nextNotification) {
      nextNotification.setDate(nextNotification.getDate() + 1);
    }

    const trigger = nextNotification; // 정확한 시간을 사용

    const notification = {
      content: {
        title: "오늘의 IT 용어 학습을 잊으신건 아니죠?",
        body: "termterm에서 IT 용어를 공부해보세요!",
        sound: "default",
      },
      trigger,
    };

    Notifications.scheduleNotificationAsync(notification);
  };

  return { requestPermission, scheduleNotification };
};
