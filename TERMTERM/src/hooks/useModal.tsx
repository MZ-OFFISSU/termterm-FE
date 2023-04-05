import { modalState } from "@recoil/iconHeaderState";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SetterOrUpdater } from "recoil";

/**
 * 헤더에서 띄우는 모달 관리 훅
 */
export function useModal(): [boolean, SetterOrUpdater<boolean>] {
  const [modal, setModal] = useRecoilState(modalState);

  useFocusEffect(
    useCallback(() => {
      setModal(false);
    }, [])
  );

  return [modal, setModal];
}
