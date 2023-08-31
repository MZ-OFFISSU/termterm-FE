declare module "Folder" {
  export type FolderDetail = {
    bookmarked: string;
    categories: string[];
    comments: FolderTermComment[];
    description: string;
    id: number;
    name: string;
    source: string;
  };

  export type FolderTermComment = {
    authorJob: string;
    authorName: string;
    authorProfileImageUrl: string;
    content: string;
    createdDate: string;
    id: number;
    likeCnt: number;
    liked: "NO" | "YES";
    source: string;
  };

  export type FolderPreview = {
    currentCount: number;
    description: string;
    folderId: number;
    saveLimit: number;
    terms: FolderTermPreview[];
    title: string;
  };

  export type FolderTermPreview = {
    name: string;
    termId: number;
  };

  export type EditFolder = {
    description: string;
    folderId: number;
    name: string;
  };

  export type UserFolderList = {
    folderId: number;
    title: string;
    description: string;
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
