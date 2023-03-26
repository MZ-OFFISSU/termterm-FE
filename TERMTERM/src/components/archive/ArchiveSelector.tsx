import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TouchableOpacity } from "react-native";

interface Props {
  items: Array<string>;
  curIdx: number;
  setIdx: (idx: number) => void;
}

const ArchiveSelector = ({ items, curIdx, setIdx }: Props) => {
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
  justify-content: flex-start;
`;

const Item = styled.Text<{ focused: boolean; COLOR: colorTheme }>`
  font-size: ${(props) =>
    props.focused
      ? TEXT_STYLES.md2.Bd?.fontSize
      : TEXT_STYLES.md2.Reg?.fontSize}px;
  font-weight: ${(props) =>
    props.focused
      ? TEXT_STYLES.md2.Bd?.fontWeight
      : TEXT_STYLES.md2.Reg?.fontWeight};
  color: ${(props) =>
    props.focused ? props.COLOR.Text.active : props.COLOR.Text.muted};
  marginright: 10px;
`;

export default ArchiveSelector;
