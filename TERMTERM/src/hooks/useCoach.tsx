import AsyncStorage from "@react-native-async-storage/async-storage";
import { tutorialState } from "@recoil/tutorialState";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export type CoachType = "folder" | "slide" | "comment";

export const useCoach = () => {
  const isTutorialOpen = useRecoilValue(tutorialState);
  const [isOpen, setIsOpen] = useState(false);
  const [whatCoach, setWhatCoach] = useState<CoachType>("folder");
  const [checked, setChecked] = useState(false);

  const openCoach = async (type: CoachType) => {
    const checkPrevState = await AsyncStorage.getItem(`coach_${type}`);

    if (!checkPrevState && !isTutorialOpen) {
      setIsOpen(true);
      setWhatCoach(type);
    }
  };

  const hideCoach = async (type: CoachType, save: boolean) => {
    if (save) await AsyncStorage.setItem(`coach_${type}`, "hide");
    setIsOpen(false);
  };

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  return { isOpen, hideCoach, openCoach, checked, handleCheck };
};
