import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCarousel } from "@components/terms/";
import { useEffect, useState } from "react";
import { WordProps } from "@interfaces/word";
import OtherThink from "@components/OtherThink";
import { useHeader } from "@hooks/useHeader";
import { dummyWords } from "@assets/dummyWord";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { screenWidth } from "@style/dimensions";
import { useCoach } from "@hooks/useCoach";
import Coachmark from "@components/popup/coach";

export type Props = StackScreenProps<
  RootStackParamList,
  "FolderDetailCollapse"
>;

interface FolderProps {
  name: string;
  desc: string;
}

const defaultProps: FolderProps = {
  name: "",
  desc: "",
};

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
  const [words, setWords] = useState<Array<WordProps>>();
  const [curIdx, setCurIdx] = useState(0);
  const [folderInfo, setFolderInfo] = useState<FolderProps>(defaultProps);
  const coachConfigs = useCoach();

  const { setHeaderState, settingIdx } = useHeader();

  const settingHeader = (words: Array<WordProps>) => {
    const defaultHeaderState = {
      id: route.params.id,
      maxNum: words.length,
      curNum: curIdx + 1,
      bookmarked: words[curIdx].bookmarked ? true : false,
    };
    setHeaderState(defaultHeaderState);
  };

  const settingProps = () => {
    const dummyInfo: FolderProps = {
      name: "기획",
      desc: "기획 관련 용어들의 모음",
    };

    setFolderInfo(dummyInfo);
  };

  const snap = (idx: number) => {
    setCurIdx(idx);
    settingIdx(idx);
  };

  useEffect(() => {
    //TODO : 큐레이션 속 용어 아이디로 용어 상세 받아오기
    //TODO : 폴더 정보 받아오기
    setWords(dummyWords);
    settingHeader(dummyWords);
    settingProps();
  }, [route]);

  useEffect(() => {
    coachConfigs.openCoach("folder");
  }, []);

  return (
    <Container COLOR={COLOR}>
      {words ? (
        <>
          <WordCarousel
            words={words}
            dots={false}
            snap={snap}
            touchable={false}
          />
          <FolderInfo {...folderInfo} />
          <OtherThink word={words[curIdx]} />
        </>
      ) : (
        <></>
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
  padding: 20px 0px 100px 0px;
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
