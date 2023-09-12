import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TEXT_STYLES, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

interface Props {
  type: string;
}

/**
 * 북마크 유도하는 컴포넌트 (용어나 큐레이션의 북마크가 비어있을 때 보여주는)
 */
const GotoBookmark = ({ type }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Container>
      <AutoSizedImage
        height={100}
        source={require("@assets/bookmark-character.png")}
      />
      <Title COLOR={COLOR}>{`아직 아카이빙을\n하지 않으셨군요!`}</Title>
      <Subtitle COLOR={COLOR}>
        {"아카이빙을 하면 "}
        <Subtitle COLOR={COLOR} style={{ fontWeight: `900` }}>
          {type} 아카이브
        </Subtitle>
        {`를\n더욱 잘 활용할 수 있어요`}
      </Subtitle>
      <CustomButton
        COLOR={COLOR}
        mode={mode}
        onPress={() => navigation.navigate("Search")}
      >
        <BtnInner COLOR={COLOR}>아카이빙 하러가기</BtnInner>
        <Entypo
          name="chevron-right"
          //TODO : size 해결
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
  margin-top: 70px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Heading[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
  white-space: pre-line;
  margin-top: 20px;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[3].Regular};
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
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.lighten};
`;

export default GotoBookmark;
