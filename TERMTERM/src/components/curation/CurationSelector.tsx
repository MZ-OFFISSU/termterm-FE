import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TouchableOpacity } from "react-native";

interface Props {
  items: Array<string>;
  curIdx: number;
  setIdx: (idx: number) => void;
}

const CurationSelector = ({ items, curIdx, setIdx }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Selectors>
      {items.map((item, idx) => (
        <TouchableOpacity key={item} onPress={() => setIdx(idx)}>
          <Item focused={curIdx === idx} COLOR={COLOR}>
            {item}
          </Item>
        </TouchableOpacity>
      ))}
    </Selectors>
  );
};

const Selectors = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.Text<{ focused: boolean; COLOR: colorTheme }>`
  ${(props) =>
    props.focused
      ? TYPO_STYLE.Body[2].Bold
      : TYPO_STYLE.Body[2].Regular};
  color: ${(props) =>
    props.focused ? props.COLOR.Text.active : props.COLOR.Text.muted};
`;

export default CurationSelector;
