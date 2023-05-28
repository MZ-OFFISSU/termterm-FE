import { TouchableOpacity } from "react-native-gesture-handler";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { ChildrenProps, LeftBox, Title } from "./common";

/**
 * 용어퀴즈 시작 가능
 */
const Start = ({ navigate }: ChildrenProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <>
      <LeftBox>
        <AutoSizedImage source={require("@assets/test.png")} width={24} />
        <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
          Daily 용어 퀴즈를 시작해 볼까요?
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

export default Start;
