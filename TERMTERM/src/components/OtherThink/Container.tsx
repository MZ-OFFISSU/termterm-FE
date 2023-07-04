import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import CommentComponent from "./Commnet";
import { Comment } from "@interfaces/word";
import { useCallback } from "react";
import { Entypo } from "@expo/vector-icons";

interface Props {
  comments: Array<Comment>;
}

const Container = ({ comments }: Props) => {
  const [COLOR] = useThemeStyle();

  const renderItem = useCallback(
    (comment: Comment) => (
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
        <FilterPreviewBox>
          <Entypo
            name="chevron-down"
            size={18}
            color={COLOR.Text.active}
            style={{ marginBottom: 2 }}
          />
          <Subtitle COLOR={COLOR}>최신순</Subtitle>
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
