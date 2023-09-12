import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TEXT_STYLES, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { PreviewBookmark } from "@components/common/Bookmark";
import { Ionicons } from "@expo/vector-icons";
import { truncateString } from "@utils/wordCutter";
import { useWordReg } from "@hooks/useWordReg";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useTerm } from "@hooks/useTerm";
import { booleanConverter } from "@utils/booleanConverter";
import { useArchive } from "@hooks/useArchive";
import CustomModal from "@components/popup/modal";

interface Props extends TouchableOpacityProps {
  id: number;
  name: string;
  description: string;
  bookmarked: string;
}

/**
 * 용어 미리보기 박스
 */
const TermPreviewBox = ({
  id,
  name,
  description,
  bookmarked,
  ...props
}: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(name);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { archiveTerm, isModalOpen, goToFolderMake, closeModal } = useArchive();

  return (
    <Container
      style={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: mode ? COLOR.Neutral[5] : COLOR.Background.input,
        borderTopColor: mode ? COLOR.Neutral[5] : COLOR.Background.input,
        marginBottom: 5,
      }}
      {...props}
      onPress={() => navigation.navigate("TermDetail", { id: `${id}` })}
    >
      <UpperBox>
        <Job COLOR={COLOR}>{main}</Job>
        <PreviewBookmark onPress={() => archiveTerm(id)}>
          {booleanConverter(bookmarked) ? (
            <Ionicons
              name="ios-bookmark"
              size={22}
              color={COLOR.THEME.secondary[130]}
            />
          ) : (
            <Ionicons
              name="ios-bookmark-outline"
              size={22}
              color={COLOR.Neutral[20]}
            />
          )}
        </PreviewBookmark>
      </UpperBox>
      <Description COLOR={COLOR}>
        {description !== null
          ? truncateString(description, 60)
          : "용어 설명이 없어요."}
      </Description>
      <CustomModal
        visible={isModalOpen}
        title={"용어 아카이빙 폴더가 없어요"}
        subtitle={
          "폴더를 만들어 용어를 아카이빙한 후\n용어 아카이브를 활용해 보세요"
        }
        btnTitle={["나중에 만들게요", "폴더 만들기"]}
        onNext={goToFolderMake}
        onClose={() => {
          closeModal();
        }}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 120px;
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpperBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Job = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const Description = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  line-height: 21px;
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 10px;
  white-space: pre-line;
  text-align: left;
  width: 100%;
`;

export default TermPreviewBox;
