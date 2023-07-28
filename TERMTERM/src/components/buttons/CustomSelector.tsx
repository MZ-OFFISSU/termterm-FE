import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import DropDownPicker from "react-native-dropdown-picker";
import { DropDownPickerProps, ValueType } from "react-native-dropdown-picker";
import { useThemeStyle } from "@hooks/useThemeStyle";

type ICVDropDownPickerProps = DropDownPickerProps<ValueType>;

const CustomSelector = ({ ...props }: ICVDropDownPickerProps) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    // 직접 커스터마이징한 셀렉트 박스 코드
    // 라이브러리 사용으로 주석처리
    // v2에서 커스터마이징으로 바꾸면 좋을듯
    // <SelectorBox
    //   border={
    //     isFocused
    //       ? LIGHT_COLOR_STYLE.Background.inputBorderFocus
    //       : LIGHT_COLOR_STYLE.Neutral[20]
    //   }
    //   background={
    //     isFocused
    //       ? LIGHT_COLOR_STYLE.Background.surface
    //       : LIGHT_COLOR_STYLE.Background.input
    //   }
    //   {...props}
    // >
    //   <SelectorTitle
    //     color={
    //       isFocused
    //         ? LIGHT_COLOR_STYLE.Text.active
    //         : LIGHT_COLOR_STYLE.Text.disabled
    //     }
    //   >
    //     {title}
    //   </SelectorTitle>
    //   <AntDesign
    //     name="down"
    //     size={14}
    //     color={
    //       isFocused
    //         ? LIGHT_COLOR_STYLE.Text.active
    //         : LIGHT_COLOR_STYLE.Text.disabled
    //     }
    //   />
    // </SelectorBox>

    <DropDownPicker
      {...props}
      theme={mode ? "LIGHT" : "DARK"}
      placeholderStyle={{
        color: LIGHT_COLOR_STYLE.Text.disabled,
        fontWeight: "500",
      }}
      arrowIconStyle={{
        width: 20,
        height: 20,
      }}
      closeIconStyle={{
        width: 25,
        height: 25,
      }}
      labelStyle={{
        color: COLOR.Text.active,
        marginLeft: 5,
      }}
      style={{
        borderColor:
          props.value === ""
            ? COLOR.Neutral[20]
            : mode
            ? COLOR.Background.inputBorderFocus
            : COLOR.Background.inputBorderDefault,
        backgroundColor:
          props.value === ""
            ? COLOR.Background.input
            : COLOR.Background.surface,
        height: 44,
        marginTop: 15,
      }}
    />
  );
};

const SelectorBox = styled.TouchableOpacity<{
  border: string;
  background: string;
}>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.border};
  background-color: ${(props) => props.background};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
`;

const SelectorTitle = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  ${TYPO_STYLE.Body[2].SemiBold};
`;

export default CustomSelector;
