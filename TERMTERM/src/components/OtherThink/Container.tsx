import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import styled from "styled-components/native";
import CommentComponent from "./Commnet";
import { Comment } from "@interfaces/word";
import { useCallback, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TermComment } from "Term";

interface Props {
  comments: Array<TermComment>;
}

enum Filter {
  recent = "최신순",
  recommend = "추천순",
}

const Container = ({ comments }: Props) => {
  const [COLOR] = useThemeStyle();
  const { showActionSheetWithOptions } = useActionSheet();

  const [filter, setFilter] = useState(Filter.recent);

  const openActionSheet = () => {
    const options = ["최신순", "추천순", "취소"];
    const cancelButtonIndex = 2;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            //최신순
            setFilter(Filter.recent);
            break;
          case 1:
            //추천순
            setFilter(Filter.recommend);
            break;
          case cancelButtonIndex:
          // 닫기
        }
      }
    );
  };

  const renderItem = useCallback(
    (comment: TermComment) => (
      <CommentComponent comment={comment} key={comment.id} />
    ),
    []
  );

  return (
    <BottomSheetScrollView
      style={{ backgroundColor: COLOR.Background.surface }}
    >
      <FilterBox>
        <Title COLOR={COLOR}>용어에 대한 다른 생각</Title>
        <FilterPreviewBox onPress={openActionSheet}>
          <Entypo
            name="chevron-down"
            size={18}
            color={COLOR.Text.active}
            style={{ marginBottom: 2 }}
          />
          <Subtitle COLOR={COLOR}>{filter}</Subtitle>
        </FilterPreviewBox>
      </FilterBox>
      {comments.map(renderItem)}
    </BottomSheetScrollView>
  );
};

const FilterBox = styled.View`
  width: 100%;
  height: 60px;
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;

const FilterPreviewBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Subtitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
  margin-left: 5px;
`;

export default Container;
