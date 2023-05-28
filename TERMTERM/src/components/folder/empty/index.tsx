import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FolderInfo from "../FolderInfo";

interface Props {
  title: string;
  subtitle: string;
}

/**
 * 폴더 내부에서 -> 아카이빙을 하지 않으셨군요!
 */
const Empty = ({ title, subtitle }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const navigation = useNavigation();

  return (
    <Container>
      <FolderInfo
        title={title}
        subtitle={subtitle}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <AutoSizedImage
        width={115}
        source={require("@assets/bookmark-character.png")}
      />
      <Title COLOR={COLOR}>{`아직 아카이빙을\n하지 않으셨군요!`}</Title>
      <Subtitle COLOR={COLOR}>
        {"아카이빙을 하면 "}
        <Subtitle COLOR={COLOR} style={{ fontWeight: `900` }}>
          {title} 아카이브
        </Subtitle>
        {`를\n더욱 잘 활용할 수 있어요`}
      </Subtitle>
      <CustomButton
        COLOR={COLOR}
        mode={mode}
        //여기 에러나는데 그냥 무시해도 됨
        onPress={() => navigation.navigate("Search")}
      >
        <BtnInner COLOR={COLOR}>아카이빙 하러가기</BtnInner>
        <Entypo
          name="chevron-right"
          size={TEXT_STYLES.md2.Sb?.fontSize}
          color={COLOR.Text.lighten}
        />
      </CustomButton>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative;
  padding: 30px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.xl.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.xl.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
  white-space: pre-line;
  margin-top: 20px;
  line-height: 32px;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md1.Eb?.fontSize}rem;
  color: ${(props) => props.COLOR.Text.default};
  text-align: center;
  white-space: pre-line;
  margin-top: 20px;
  line-height: 28px;
`;

const CustomButton = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 90%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${(props) =>
    props.mode ? props.COLOR.Neutral[100] : props.COLOR.Background.onSurface};

  margin-top: 60px;
`;

const BtnInner = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  color: ${(props) => props.COLOR.Text.lighten};
`;

export default Empty;
