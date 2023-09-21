import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCarousel } from "@components/terms/";
import { useEffect, useMemo, useState } from "react";
import { WordProps } from "@interfaces/word";
import OtherThink from "@components/OtherThink";
import { useHeader } from "@hooks/useHeader";
import Empty from "@components/folder/empty";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { screenWidth } from "@style/dimensions";
import { useCoach } from "@hooks/useCoach";
import Coachmark from "@components/popup/coach";
import { useArchive } from "@hooks/useArchive";

export type Props = StackScreenProps<
  RootStackParamList,
  "FolderDetailCollapse"
>;

interface FolderProps {
  name: string;
  desc: string;
}

const FolderInfo = ({ name, desc }: FolderProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <FolderInfoWrapper>
      <AutoSizedImage
        source={require("@assets/icon/CurFolder.png")}
        width={18}
      />
      <Title COLOR={COLOR}>{name}</Title>
      <Desc COLOR={COLOR}>{desc}</Desc>
    </FolderInfoWrapper>
  );
};

/**
 * 여러 용어 설명 페이지
 */
const FolderDetailCollapse = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curIdx, setCurIdx] = useState(0);
  const coachConfigs = useCoach();
  const { termsEach, getTermsEachInFolder, folderInfo } = useArchive();
  const {
    setHeaderState,
    settingIdx,
    settingBookmarkArray,
    settingTermsArray,
  } = useHeader();

  const items = useMemo(() => {
    if (termsEach.length > 0) {
      return termsEach.map((item) => {
        return {
          termId: item.id,
          ...item,
        };
      });
    }
    return [];
  }, [termsEach]);

  const settingHeader = (words: Array<WordProps>) => {
    const defaultHeaderState = {
      id: words[curIdx].termId,
      maxNum: words.length,
      curNum: curIdx,
      bookmarked: true,
      folderId: route.params.id,
    };
    setHeaderState(defaultHeaderState);
  };

  const snap = (idx: number) => {
    setCurIdx(idx);
    settingIdx(idx);
  };

  useEffect(() => {
    getTermsEachInFolder(route.params.id);
  }, [route]);

  useEffect(() => {
    if (items.length > 0) {
      settingBookmarkArray(items.length);
      settingHeader(items);
      settingTermsArray(items.map((item) => item.id));
    }
  }, [items]);

  useEffect(() => {
    coachConfigs.openCoach("folder");
  }, []);

  return (
    <Container COLOR={COLOR}>
      {termsEach.length > 0 ? (
        <>
          <WordCarousel
            words={termsEach.map((item) => {
              return {
                termId: item.id,
                ...item,
              };
            })}
            dots={false}
            snap={snap}
            touchable={false}
          />
          <FolderInfo {...folderInfo} />
          <OtherThink word={termsEach[curIdx] as any} />
        </>
      ) : (
        <EmptyWrapper COLOR={COLOR}>
          <Empty title={folderInfo.name} subtitle={folderInfo.desc} />
        </EmptyWrapper>
      )}
      <Coachmark type="folder" {...coachConfigs} />
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 0px 0px 100px 0px;
`;

const EmptyWrapper = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 0px 16px;
  position: relative;
`;

const FolderInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: ${screenWidth + 15}px;
  left: 20px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.default};
  margin-left: 6px;
`;

const Desc = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Regular};
  color: ${(props) => props.COLOR.Text.muted};
  margin-left: 6px;
`;

export default FolderDetailCollapse;
