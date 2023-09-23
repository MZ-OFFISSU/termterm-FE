import AsyncStorage from "@react-native-async-storage/async-storage";
import { coachState, tutorialState } from "@recoil/tutorialState";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export type CoachType = "folder" | "slide" | "comment" | "collapse";

export const useCoach = () => {
  const [isOpen, setIsOpen] = useRecoilState(coachState);
  const [whatCoach, setWhatCoach] = useState<CoachType>("folder");
  const [checked, setChecked] = useState(false);

  const openCoach = async (type: CoachType) => {
    const checkPrevState = await AsyncStorage.getItem(`coach_${type}`);

    if (!checkPrevState) {
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
