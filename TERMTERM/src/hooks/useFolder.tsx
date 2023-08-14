import FolderApi from "@api/FolderApi";
import { CreateFolder } from "Folder";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";

export const useFolder = () => {
  const folderApi = new FolderApi();
  const [COLOR, mode] = useThemeStyle();

  const successToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "폴더 생성이 완료되었어요!",
    });
  };

  const failedToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "폴더 생성을 실패했어요.",
    });
  };

  const createFolder = async (input: CreateFolder) => {
    try {
      const config: CreateFolder = {
        description: input.description,
        title: input.title,
      };
      await folderApi.registerFolder({
        description: config.description,
        title: config.title,
      });
      successToast();
    } catch (err) {
      console.log(err);
      failedToast();
    }
  };

  return {
    createFolder,
    successToast,
    failedToast,
  };
};
