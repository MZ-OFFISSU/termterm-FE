import Toast from "react-native-toast-message";

/**------ 토스트메시지 오픈 함수 ------**/
export const loginSucceed = () => {
  Toast.show({
    type: "light",
    text1: "로그인에 성공하였습니다!",
  });
};

export const loginFailed = () => {
  Toast.show({
    type: "dark",
    text1: "로그인에 실패하였습니다!",
  });
};

export const needRegister = () => {
  Toast.show({
    type: "light",
    text1:
      "반가워요! 텀텀에 오신 것을 환영해요.\n최초 1회, 간단한 정보를 입력해주세요!",
  });
};

export const registerSucceed = () => {
  Toast.show({
    type: "light",
    text1: "회원가입에 성공하였습니다!\n이제 텀텀을 마음껏 즐겨보세요!",
  });
};

export const registerFailed = () => {
  Toast.show({
    type: "dark",
    text1: "회원가입에 실패하였습니다.\n다시 시도해주세요.",
  });
};

export const logoutSucceed = () => {
  Toast.show({
    type: "dark",
    text1: "로그아웃이 완료되었습니다!\n언제든 다시 돌아와주세요 :)",
  });
};
