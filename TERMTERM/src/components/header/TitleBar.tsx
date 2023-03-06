import NavigationBar from "../common/NavigationBar";
import { NavigatorTitle, NavigatorPager } from "../common/NavigatorTitle";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import AutoSizedImage from "@components/common/AutoSizedImage";

export enum Icon {
  point,
  folder,
}

export interface Props {
  title: string;
  /**
   * 아이콘 종류
   * "point" -> 포인트 아이콘
   * "folder" -> 폴더 아이콘
   * 전달 안하면 아이콘 없음
   */
  icon?: Icon;
  /**
   * 포인트 점수
   */
  point?: number;
  /**
   * 아이콘 클릭시 실행 될 함수
   */
  onPress?: () => void;
}

/**
 * 타이틀이 왼쪽에 위치한 헤더
 * 자식 노드에 오른쪽에 위치한 요소를 배치할 수 있다.
 * 1~3번 헤더 컴포넌트
 */
const TitleBar = ({ title, icon, point, onPress }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <NavigationBar style={{ justifyContent: "space-between" }}>
      <NavigatorTitle style={{ color: COLOR.Text.active, marginLeft: 20 }}>
        {title}
      </NavigatorTitle>
      {icon === Icon.point ? (
        <PointBox>
          <AutoSizedImage
            source={require("@assets/icon/points.png")}
            height={24}
          />
          <NavigatorPager style={{ marginLeft: 5 }}>{point!}</NavigatorPager>
        </PointBox>
      ) : icon === Icon.folder ? (
        <FolderBtn onPress={() => onPress!()}>
          <AntDesign name="addfolder" size={22} color={COLOR.Text.active} />
        </FolderBtn>
      ) : (
        <></>
      )}
    </NavigationBar>
  );
};

const PointBox = styled.View`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const FolderBtn = styled.TouchableOpacity`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export default TitleBar;
