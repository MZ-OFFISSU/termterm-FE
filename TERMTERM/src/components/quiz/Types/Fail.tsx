import AutoSizedImage from "@components/common/AutoSizedImage";
import { ChildrenProps, LeftBox, Title } from "./common";
import { TouchableOpacity } from "react-native";
import { useThemeStyle } from "@hooks/useThemeStyle";

/**
 * 용어 퀴즈에 오답이 있는 경우 (타이머 적용)
 */
const Fail = ({ navigate }: ChildrenProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <>
      <LeftBox>
        <AutoSizedImage source={require("@assets/clock.png")} width={24} />
        <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
          후 용어 복습 퀴즈를 응시할 수 있어요
        </Title>
      </LeftBox>
      <TouchableOpacity onPress={() => navigate()}>
        <AutoSizedImage
          source={require("@assets/arrow-button.png")}
          width={40}
        />
      </TouchableOpacity>
    </>
  );
};

export default Fail;
