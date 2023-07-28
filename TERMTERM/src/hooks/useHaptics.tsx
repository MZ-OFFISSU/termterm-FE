import * as Haptics from "expo-haptics";

export type hapticType =
  | "success"
  | "error"
  | "warning"
  | "light"
  | "medium"
  | "heavy";

/**
 * 햅틱을 쉽게 넣을 수 있는 훅
 */
export const useHaptics = () => {
  const haptic = (type: hapticType) => {
    switch (type) {
      case "success":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "error":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "warning":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  };

  return { haptic };
};
