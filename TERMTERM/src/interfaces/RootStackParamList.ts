/**
 * 스크린 리스트라고 생각하면 됩니다.
 * props가 존재하는 스크린의 경우에는,
 * undefined 자리에 props를 타입으로 구성해주면 돼요.
 * e.g. Profile: {name: string};
 */
export type RootStackParamList = {
  Login: undefined;
  ToolBar: undefined;
  Onboarding: undefined;
  Curation: undefined;
  Home: undefined;
  Search: undefined;
  Archive: undefined;
  My: undefined;
  ArchiveBookmark: undefined;
  DailyQuiz: undefined;
  CompleteQuiz: undefined;
  CurationDetail: { id: number };
  MakeFolder: undefined;
  FolderDetailGlance: { id: number };
  FolderDetailCollapse: { id: number };
  EditProfile: undefined;
  MyPoint: undefined;
  Notification: undefined;
  ThemeSelect: undefined;
  DeleteAccount: undefined;
  Walkthrough: undefined;
  Support: undefined;
  TermDetail: { id: number };
};
