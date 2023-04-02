import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { FolderDetailProps } from "@interfaces/folderDetail";
import TermDetailGlance from "@components/folder/glance";

export type Props = StackScreenProps<RootStackParamList, "FolderDetailGlance">;

/**
 * 폴더 상세페이지 -> 한눈에보기
 */
const FolderDetailGlance = ({ navigation, route }: Props) => {
  /**폴더 아이디로 통신해서 정보 가져오기 */
  const FOLDER_ID = route.params.id;
  const [COLOR, mode] = useThemeStyle();

  return (
    <Container COLOR={COLOR}>
      <TitleBox>
        <Title COLOR={COLOR}>{dummyData.title}</Title>
        <Subtitle COLOR={COLOR}>{dummyData.subtitle}</Subtitle>
      </TitleBox>
      <TermDetailGlance terms={dummyData.terms} />
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 0px 16px;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md1.Bd?.fontSize}px;
  font-weight: ${TEXT_STYLES.md1.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Reg?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Reg?.fontWeight};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 10px;
`;

export default FolderDetailGlance;

const dummyData: FolderDetailProps = {
  title: "기획",
  subtitle: "기획 관련 용어들의 모음",
  terms: [
    {
      id: 0,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 1,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 2,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 3,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 4,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 5,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 6,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: false,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 7,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 8,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 9,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 10,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 11,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 12,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 13,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 14,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 15,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
    {
      id: 16,
      name: "기획자",
      description:
        "지나간 모든 것들이 그렇듯이 아름다웠던 거였겠지 어제의 나 역시 얼마나 많은 시간이 지나야 알 수 있을까? 난 아직도 그래 아직도 여기",
      bookmarked: true,
      source: "https://github.com/",
      categories: [{ id: 0, name: "기획" }],
      comments: [],
    },
  ],
};
