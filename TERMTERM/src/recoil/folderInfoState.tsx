import { atom } from "recoil";

export interface FolderConfig {
  name: string;
  desc: string;
}

/**
 * 폴더명
 */
export const folderInfoState = atom<FolderConfig>({
  key: "folderInfo",
  default: {
    name: "",
    desc: "",
  },
});
