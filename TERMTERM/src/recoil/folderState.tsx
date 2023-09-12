import { UserFolderList } from "Folder";
import { atom } from "recoil";

/**
 * 폴더명
 */
export const folderState = atom<UserFolderList[]>({
  key: "folderState",
  default: [],
});
