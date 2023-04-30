import styled from "styled-components/native";
import MenuBox from "../MenuBox";
import Divider from "../MenuBox/Divider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

interface MenuProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

/**
 * 프로필 스크린에서 기본으로 보이는 메뉴 리스트
 */
const DefaultList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const MENU_LIST: Array<Array<MenuProps>> = [
    [
      { title: "알림 설정", onPress: () => navigation.push("Notification") },
      { title: "테마 변경", onPress: () => navigation.push("ThemeSelect") },
    ],
    [
      { title: "문의 사항", onPress: () => null },
      { title: "앱 공유하기", onPress: () => null },
    ],
    [{ title: "버전 정보", subtitle: "v 1.0", onPress: () => null }],
    [
      { title: "서비스 이용약관", onPress: () => null },
      { title: "개인정보 처리방침", onPress: () => null },
    ],
    [
      { title: "로그아웃", onPress: () => null },
      { title: "탈퇴하기", onPress: () => null },
    ],
  ];

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
