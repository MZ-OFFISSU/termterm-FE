import styled from "styled-components/native";
import MenuBox from "../MenuBox";
import Divider from "../MenuBox/Divider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import CustomModal from "@components/popup/modal";
import { useState } from "react";
import { useMember } from "@hooks/useMember";
import { logoutSucceed } from "@utils/showToast";
import { useHaptics } from "@hooks/useHaptics";
import { Linking } from "react-native";
import { useShare } from "@hooks/useShare";

interface MenuProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

/**
 * 프로필 스크린에서 기본으로 보이는 메뉴 리스트
 */
const DefaultList = () => {
  const { haptic } = useHaptics();
  const { logout, loading } = useMember();
  const { handleShare } = useShare();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isModal, setIsModal] = useState(false);

  const openURL = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle URL: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const MENU_LIST: Array<Array<MenuProps>> = [
    [
      { title: "알림 설정", onPress: () => navigation.push("Notification") },
      { title: "테마 변경", onPress: () => navigation.push("ThemeSelect") },
    ],
    [
      { title: "문의하기", onPress: () => navigation.push("Support") },
      { title: "앱 공유하기", onPress: () => handleShare() },
    ],
    [{ title: "버전 정보", subtitle: "v 1.0", onPress: () => null }],
    [
      {
        title: "서비스 이용약관",
        onPress: () =>
          openURL(
            "https://termterm-official.notion.site/termterm-6e59200979eb4cd19eb06bae7a6a493a"
          ),
      },
      {
        title: "개인정보 처리방침",
        onPress: () =>
          openURL(
            "https://termterm-official.notion.site/termterm-e36735c262764c7e855851fb75dde077"
          ),
      },
    ],
    [
      { title: "로그아웃", onPress: () => setIsModal(true) },
      { title: "탈퇴하기", onPress: () => navigation.push("DeleteAccount") },
    ],
  ];

  const logoutHandler = async () => {
    await logout();
    haptic("warning");

    logoutSucceed();
    if (!loading) {
      setIsModal(false);
      navigation.reset({
        routes: [{ name: "Login", params: { nonAuto: true } }],
      });
    }
  };

  return (
    <>
      {MENU_LIST.map((menus, idx) => (
        <MenusWrapper key={idx}>
          {menus.map((menu) => (
            <MenuBox key={menu.title} {...menu} />
          ))}
          {idx === MENU_LIST.length - 1 ? <></> : <Divider />}
        </MenusWrapper>
      ))}
      <CustomModal
        visible={isModal}
        title="정말 로그아웃 하시겠습니까?"
        btnTitle={["취소", "로그아웃"]}
        onClose={() => setIsModal(false)}
        onNext={() => logoutHandler()}
      />
    </>
  );
};

const MenusWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default DefaultList;
