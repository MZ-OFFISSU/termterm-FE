import AutoSizedImage from "@components/common/AutoSizedImage";
import { ChildrenProps, LeftBox, Title } from "./common";
import { TouchableOpacity } from "react-native";
import { useThemeStyle } from "@hooks/useThemeStyle";

/**
 * 퀴즈를 전부 맞춘 경우
 */
const Clear = ({ navigate }: ChildrenProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <>
      <LeftBox>
        <AutoSizedImage source={require("@assets/test.png")} width={24} />
        <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
          정말 잘하셨어요! 내일 다시 만나요 🙌🏻
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

export default Clear;
