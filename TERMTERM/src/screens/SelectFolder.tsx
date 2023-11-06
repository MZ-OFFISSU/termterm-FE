import FolderList from "@components/FolderList";
import { BUTTON_STATE, BUTTON_TYPE, CustomButton } from "@components/index";
import { useArchive } from "@hooks/useArchive";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { screenHeight } from "@style/dimensions";
import styled from "styled-components/native";

export type Props = StackScreenProps<RootStackParamList, "SelectFolder">;

const SelectFolder = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { selectedFolders, handleSelectFolder, myFolderList, handleArchive } =
    useArchive();

  return (
    <Container COLOR={COLOR}>
      <Inner>
        <Topper>
          <TitleContainer>
            <TitleWrapper>
              {mode && <Highlighting COLOR={COLOR} />}
              {mode ? (
                <Title COLOR={COLOR}>아카이빙할 폴더를 선택해주세요</Title>
              ) : (
                <Title COLOR={COLOR}>
                  <HighlightTitle COLOR={COLOR}>아카이빙할 폴더</HighlightTitle>
                  를 선택해주세요
                </Title>
              )}
            </TitleWrapper>
            <Subtitle COLOR={COLOR} mode={mode}>
              단어 하나를 여러 개의 폴더에 아카이빙 할 수 있어요!
            </Subtitle>
          </TitleContainer>
          <FolderList
            myFolderList={myFolderList!}
            selectedFolders={selectedFolders}
            handleSelectFolder={handleSelectFolder}
            termId={route.params.termId}
          />
        </Topper>
        <CustomButton
          title="확인"
          onPress={() => handleArchive(route.params.termId)}
          theme={mode}
          type={BUTTON_TYPE.primary}
          state={
            selectedFolders.length > 0
              ? BUTTON_STATE.active
              : BUTTON_STATE.default
          }
          disabled={selectedFolders.length === 0}
          style={{ width: "100%", marginTop: 150 }}
        />
      </Inner>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 34px 16px;
`;

const Inner = styled.View`
  width: 100%;
  min-height: ${screenHeight * 0.65}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 34px;
`;

const Topper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 16px;
`;

const TitleWrapper = styled.View`
  position: relative;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  text-align: start;
  white-space: pre-line;
  word-break: keep-all;
  ${TYPO_STYLE.Body[1].ExtraBold};
  color: ${(props) => props.COLOR.Text.active};
`;

const HighlightTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].ExtraBold};
  color: ${(props) => props.COLOR.THEME.primary[100]};
`;

const Highlighting = styled.View<{ COLOR: colorTheme }>`
  width: 230px;
  height: 10px;
  background-color: ${(props) => props.COLOR.THEME.primary[100]};

  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};

  margin-top: 15px;
`;

export default SelectFolder;
