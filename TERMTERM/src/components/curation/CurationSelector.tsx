import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useCuration } from "@hooks/useCuration";
import { Category } from "Curation";

interface Props {
  items: Array<string>;
  curIdx: number;
  setIdx: (idx: number) => void;
}

const CurationSelector = ({ items, curIdx, setIdx }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const {
    getEachCategoryCurationList,
    categoryCurationList,
    setCategoryCurationList,
  } = useCuration();
  const [renderItems, setRenderItems] = useState(items);

  const convertIdxToCategory = (idx: number): string | undefined => {
    switch (idx) {
      case 0:
        return undefined;
      case 1:
        return "pm";
      case 2:
        return "marketing";
      case 3:
        return "development";
      case 4:
        return "design";
      case 5:
        return "business";
      case 6:
        return "IT";
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const selectedCategory = convertIdxToCategory(curIdx);
    getEachCategoryCurationList(selectedCategory as Category);
  }, [curIdx]);

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
    props.focused ? TYPO_STYLE.Body[2].Bold : TYPO_STYLE.Body[2].Regular};
  color: ${(props) =>
    props.focused ? props.COLOR.Text.active : props.COLOR.Text.muted};
`;

export default CurationSelector;
