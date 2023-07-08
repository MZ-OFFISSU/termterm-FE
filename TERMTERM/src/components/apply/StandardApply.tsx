import { useThemeStyle } from "@hooks/useThemeStyle";
import {
  ApplyProps,
  CheckBoxContent,
  CheckBoxWrapper,
  Content,
  InfoWrapper,
  ListItem,
  ListItemCaption,
  ListItemCaptionText,
  ListText,
  Title,
  Wrapper,
} from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { BUTTON_STATE, BUTTON_TYPE, CustomButton } from "..";

const StandardApply = ({ nextStage }: ApplyProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [checked, setChecked] = useState(false);

  const onCheck = () => {
    setChecked((prev) => !prev);
  };
  const navigate = () => {
    checked ? nextStage() : null;
  };

  const desc1 = `termterm은 ‘용어에 대한 다른 생각’에 신뢰할 수 있는\n데이터가 등재되어 더 좋은 경험을 선사할 수 있도록\n끊임없이 노력하고 있어요.`;
  const desc2 = `나만의 용어 설명의 승인 여부는\n휴일을 제외한 평일 하루이내에 결정되어요.`;
  const standards = [
    "출처 여부의 명확성",
    "저작권 침해&명예 훼손을 하지 않는 설명",
    "개인정보를 유출하지 않는 설명",
    "광고 및 홍보성 내용이 포함되어 있지 않은 설명",
    "용어와 관련된 설명",
    "사기 및 거짓 정보를 포함하지 않는 설명",
    "올바른 정보를 포함하는 설명",
    "올바른 용어를 사용하여 작성한 설명",
  ];
  const caption =
    "악의적인 의견 제출이 지속될 경우 제재를 받을 수 있어요.\n작성한 용어 설명은 승인 이후 삭제할 수 없으며,\n탈퇴 이후에도 삭제되지 않아요.";

  return (
    <Wrapper>
      <Wrapper style={{ alignItems: "flex-start" }}>
        <InfoWrapper>
          <Title COLOR={COLOR}>나만의 용어 설명 승인 기준</Title>
          <Content COLOR={COLOR} style={{ marginTop: 16 }}>
            {desc1}
          </Content>
          <Content COLOR={COLOR} style={{ marginTop: 12 }}>
            {desc2}
          </Content>
        </InfoWrapper>
        {standards.map((standard) => (
          <ListItem COLOR={COLOR} key={standard}>
            <ListText COLOR={COLOR}>{standard}</ListText>
          </ListItem>
        ))}
        <ListItemCaption COLOR={COLOR}>
          <AutoSizedImage
            source={require("@assets/bookmark-character.png")}
            width={70}
          />
          <ListItemCaptionText COLOR={COLOR}>{caption}</ListItemCaptionText>
        </ListItemCaption>
        <CheckBoxWrapper onPress={onCheck}>
          <CheckBoxIcon checked={checked} />
          <CheckBoxContent COLOR={COLOR}>확인하였습니다.</CheckBoxContent>
        </CheckBoxWrapper>
      </Wrapper>
      <CustomButton
        title="다음"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={checked ? BUTTON_STATE.active : BUTTON_STATE.default}
        onPress={navigate}
        style={{ width: "100%", marginTop: 32 }}
      />
      <CustomButton
        title="다시 보지 않기"
        theme={mode}
        type={BUTTON_TYPE.primary}
        state={BUTTON_STATE.default}
        style={{ width: "100%", marginTop: 16, marginBottom: 32 }}
      />
    </Wrapper>
  );
};

interface CheckProps {
  checked: boolean;
}

export const CheckBoxIcon = ({ checked }: CheckProps) => {
  const [COLOR, mode] = useThemeStyle();

  return checked ? (
    <Ionicons name="md-checkbox" size={24} color={COLOR.Text.active} />
  ) : (
    <Ionicons name="ios-checkbox-outline" size={24} color={COLOR.Text.active} />
  );
};

export default StandardApply;
