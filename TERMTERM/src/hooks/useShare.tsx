import * as Sharing from "expo-sharing";
import * as Haptics from "expo-haptics";

export const useShare = () => {
  const handleShare = async (url = "https://www.naver.com/") => {
    if (!(await Sharing.isAvailableAsync())) {
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Sharing.shareAsync(url);
  };

  return { handleShare };
};
