import analytics from "@react-native-firebase/analytics";

export const logGAevent = async (
  eventName: string,
  params?: Record<string, any>
) => {
  await analytics().logEvent(eventName, params);
};
