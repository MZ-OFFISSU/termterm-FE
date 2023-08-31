import { TermComment, TermPreview } from "Term";

declare module "Folder" {
  export type FolderDetail = {
    bookmarked: string;
    categories: string[];
    comments: TermComment[];
    description: string;
    id: number;
    name: string;
    source: string;
  };

  export type FolderPreview = {
    currentCount: number;
    description: string;
    folderId: number;
    saveLimit: number;
    terms: TermPreview[];
    title: string;
  };

  export type EditFolder = {
    description: string;
    folderId: number;
    name: string;
  };

  export type FolderList = {
    folderId: number;
    title: string;
  };

  export type FolderInfo = {
    folderId: number;
    folderName: string;
  };

  export type CreateFolder = {
    description: string;
    title: string;
  };

  export type CancelArchive = {
    folderId: number;
    termId: number;
  };

  export type FolderModal = {
    currentFolderCount: number;
    myFolderCreationLimit: number;
    systemFolderCreationLimit: number;
  };

  export type RandomTerms = {
    description: string;
    name: string;
    source: string;
    termId: any;
  };
}
