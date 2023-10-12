import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useCuration } from "@hooks/useCuration";
import { Category } from "Curation";

interface Props {
  items: Array<string>;
}

const CurationSelector = ({ items }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { getEachCategoryCurationList } = useCuration();

  const [curIdx, setCurIdx] = useState(0);

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

  const updateCurations = (idx: number) => {
    setCurIdx(idx);
    const selectedCategory = convertIdxToCategory(idx);
    getEachCategoryCurationList(selectedCategory as Category);
  };

  return (
    <Selectors>
      {items.map((item, idx) => (
        <TouchableOpacity key={item} onPress={() => updateCurations(idx)}>
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
