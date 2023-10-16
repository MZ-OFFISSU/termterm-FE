import { useThemeStyle } from "@hooks/useThemeStyle";
import { Comment } from "@interfaces/word";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";
import { dateConverter } from "@utils/dateConverter";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { booleanConverter } from "@utils/booleanConverter";
import { TermComment } from "Term";
import { useCommentLike } from "@hooks/useCommentLike";

interface LikeProps {
  liked: boolean;
  onPress: () => Promise<void>;
}

interface Props {
  comment: TermComment;
}

const THUMBUP_ICON = [
  require("@assets/icon/Thumbup_light_empty.png"),
  require("@assets/icon/Thumbup_light_fill.png"),
  require("@assets/icon/Thumbup_dark_empty.png"),
  require("@assets/icon/Thumbup_dark_fill.png"),
];

/** 좋아요 버튼 컴포넌트 */
const LikeButton = ({ liked, onPress }: LikeProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [buttonImage, setButtonImage] = useState(0);

  const settingImage = () => {
    if (mode) {
      if (liked) setButtonImage(1);
      else setButtonImage(0);
    } else {
      if (liked) setButtonImage(3);
      else setButtonImage(2);
    }
  };

  const handleLikeButtonClick = () => {
    onPress();
    settingImage();
  };

  useEffect(() => {
    settingImage();
  }, [liked, mode]);

  return (
    <LikeButtonWrapper onPress={handleLikeButtonClick}>
      <CustomImage source={THUMBUP_ICON[buttonImage]} />
    </LikeButtonWrapper>
  );
};

/** 실제 코멘트 컴포넌트 */
const CommentComponent = ({ comment }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleLike, isMyComment, cnt, isLiked } = useCommentLike(
    comment.liked,
    comment.likeCnt
  );

  const openActionSheet = () => {
    const options = ["신고하기", "닫기"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            navigation.push("ReportWord", { id: comment.id });
            break;
          case cancelButtonIndex:
          // 닫기
        }
      }
    );
  };

  return (
    <Wrapper
      onLongPress={openActionSheet}
      delayLongPress={500}
      activeOpacity={0.8}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: mode ? COLOR.Neutral[5] : COLOR.Background.input,
        borderTopWidth: 1,
        borderTopColor: mode ? COLOR.Neutral[5] : COLOR.Background.input,
      }}
    >
      <Content COLOR={COLOR}>{comment.content}</Content>
      <Source COLOR={COLOR}>{comment.source}</Source>
      <ProfileWrapper>
        <DefaultInfoWrapper>
          <ProfileImageWrapper>
            <CustomImage source={{ uri: comment.authorProfileImageUrl }} />
          </ProfileImageWrapper>
          <ProfileTitle
            COLOR={COLOR}
            mode={mode}
          >{`${comment.authorName}님 | ${comment.authorJob}`}</ProfileTitle>
          <Date COLOR={COLOR}>{dateConverter(comment.createdDate)}</Date>
        </DefaultInfoWrapper>
        <ThumbUpWrapper>
          <LikeButton
            onPress={() => handleLike(comment.id, isLiked)}
            liked={isLiked}
          />
          {/* TODO _ 좋아요 눌렀는지 불리언 값 필요함*/}
          <Likes COLOR={COLOR}>{cnt}</Likes>
        </ThumbUpWrapper>
      </ProfileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  margin-bottom: 10px;
`;

const Content = styled.Text<{ COLOR: colorTheme }>`
  width: 100%;
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.active};
  text-align: left;
  white-space: pre-line;

  /* line-height: 20.5%; */
`;

const Source = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[2].Medium};
  text-align: left;
  color: ${(props) => props.COLOR.Text.disabled};
  margin-top: 7px;
`;

const ProfileWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const DefaultInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileImageWrapper = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ProfileTitle = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  ${TYPO_STYLE.Caption[1].Medium};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
  margin-left: 7px;
`;

const Date = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[2].Medium};
  color: ${(props) => props.COLOR.Text.muted};
  margin-left: 7px;
`;

const ThumbUpWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Likes = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.active};
`;

const LikeButtonWrapper = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-radius: 100px;
  overflow: hidden;
  margin-right: 7px;
`;

export default CommentComponent;
