/**
 * 스크린 리스트라고 생각하면 됩니다.
 * props가 존재하는 스크린의 경우에는,
 * undefined 자리에 props를 타입으로 구성해주면 돼요.
 * e.g. Profile: {name: string};
 */
export type RootStackParamList = {
  Login: { nonAuto?: boolean };
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
  TermDetail: { id: string }; //검색 후 들어가는 등, 단일 용어에 대한 상세 페이지
  TermsDetail: { id: number }; //폴더 및 큐레이션 등, 여러 용어에 대한 상세 페이지
  AllTerms: undefined;
  ReportWord: { id: number };
  MyWordApply: { id: number };
  QuizIntro: undefined;
  QuizResult: { id: number };
  QuizReview: { id: number };
  FilterScreen: undefined;
  Kakao: undefined;
  Google: undefined;
  EditFolder: { id: number };
};
