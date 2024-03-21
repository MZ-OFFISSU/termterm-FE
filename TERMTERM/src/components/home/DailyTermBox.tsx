import { BookmarkButtonComponent } from "@components/common/Bookmark";
import { Preview } from "@components/curation/detail/term";
import CustomModal from "@components/popup/modal";
import { useArchive } from "@hooks/useArchive";
import useRemoveChar from "@hooks/useRemoveChar";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useWordReg } from "@hooks/useWordReg";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { booleanConverter } from "@utils/booleanConverter";
import { truncateString } from "@utils/wordCutter";
import styled, { css } from "styled-components/native";

/**
 * 오늘의 용어 박스
 */
const DailyTermBox = ({ bookmarked, id, name, description }: Preview) => {
  const [COLOR, mode] = useThemeStyle();
  const [sub, main] = useWordReg(name);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { archiveTerm, isModalOpen, goToFolderMake, closeModal } = useArchive();
  const { filteredExplain } = useRemoveChar(description);

  return (
    <Container
      COLOR={COLOR}
      mode={mode}
      style={{ borderWidth: 1, borderColor: COLOR.Background.onSurface }}
      onPress={() => navigation.push("TermDetail", { id: `${id}` })}
    >
      <BookmarkButtonComponent
        fill={booleanConverter(bookmarked)}
        onPress={() => archiveTerm(id)}
      />
      <TitleWrapper>
        <Title COLOR={COLOR} mode={mode}>
          {main}
        </Title>
      </TitleWrapper>
      <Content COLOR={COLOR}>{truncateString(filteredExplain, 75)}</Content>
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

const Container = styled.TouchableOpacity<{ COLOR: colorTheme; mode: boolean }>`
  min-width: 165px;
  width: 49%;
  height: 205px;
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.Background.surface
      : props.COLOR.Background.onSurface};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 14px;
  margin-top: 8px;
`;

const TitleWrapper = styled.View`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.active : props.COLOR.THEME.primary[100]};
  text-align: center;
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Regular};
  //TODO : line-height 수정
  flex: 1;
  /* line-height: 17.5%; */
  color: ${(props) => props.COLOR.Text.default};
  text-align: left;
  white-space: pre-line;
`;

export default DailyTermBox;
