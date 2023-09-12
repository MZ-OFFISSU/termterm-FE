import { useThemeStyle } from "@hooks/useThemeStyle";
import {
  ApplyProps,
  Content,
  ContentBox,
  ContentCaption,
  ContentTitle,
  Title,
  TitleObjet,
  TitleWrapper,
  Wrapper,
} from "./style";
import { useState } from "react";
import CustomTextarea from "@components/common/CustomTextarea";
import { BUTTON_STATE, BUTTON_TYPE, CustomButton, CustomTextInput } from "..";
import CommentApi from "@api/CommentApi";
import { CommentInput } from "Comment";

const InputApply = ({ nextStage, termId }: ApplyProps) => {
  const commentApi = new CommentApi();
  const [comment, setComment] = useState<CommentInput>({
    content: "",
    source: "",
    termId: termId,
  });

  const [COLOR, mode] = useThemeStyle();

  const changeContent = (value: string) => {
    setComment((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };

  const changeSource = (value: string) => {
    setComment((prev) => {
      return {
        ...prev,
        source: value,
      };
    });
  };

  const navigate = () => {
    if (comment.content !== "") nextStage();
  };

  const descStyle = {
    backgroundColor: COLOR.Background.input,
  };

  const registerComment = async () => {
    try {
      await commentApi.registerComment(comment);
      // TODO : 네비게이션 이동 코드 추가
      console.log(comment);
      navigate();
    } catch (err) {
      console.log(err);
      // TODO : 네비게이션 이동 코드 추가
    }
  };

  return (
    <Wrapper>
      <Wrapper style={{ alignItems: "flex-start" }}>
        <TitleWrapper>
          {mode ? <TitleObjet /> : <></>}
          <DynamicTitle />
        </TitleWrapper>
        <Content COLOR={COLOR} style={{ marginTop: 10 }}>
          작성해주신 설명은 검토 후 승인이 되면 알려드려요!
        </Content>
        <ContentBox style={{ marginTop: 32 }}>
          <ContentTitle COLOR={COLOR}>용어 설명</ContentTitle>
          <CustomTextarea
            value={comment.content}
            max={250}
            onChangeText={changeContent}
            placeholder="용어에 대한 나만의 생각을 편안하게 남겨주세요."
            style={descStyle}
          />
        </ContentBox>
        <ContentBox style={{ marginTop: 32 }}>
          <ContentTitle COLOR={COLOR}>출처</ContentTitle>
          <CustomTextInput
            value={comment.source}
            placeholder="홈페이지 url 등"
            max={false}
            onChangeText={changeSource}
            maxLength={100}
          />
          <ContentCaption COLOR={COLOR} style={{ marginTop: 10 }}>
            출처가 있다면 반드시 출처를 밝혀주세요.
          </ContentCaption>
        </ContentBox>
      </Wrapper>
      <CustomButton
        title="신청하기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={
          comment.content !== "" ? BUTTON_STATE.active : BUTTON_STATE.default
        }
        onPress={registerComment}
        style={{ width: "100%", marginTop: 48 }}
      />
    </Wrapper>
  );
};

const DynamicTitle = () => {
  const [COLOR, mode] = useThemeStyle();
  return mode ? (
    <Title COLOR={COLOR}>나만의 용어 설명을 남겨주세요</Title>
  ) : (
    <Title COLOR={COLOR}>
      <Title COLOR={COLOR} style={{ color: COLOR.THEME.primary[100] }}>
        나만의 용어 설명
      </Title>
      을 남겨주세요
    </Title>
  );
};

export default InputApply;
