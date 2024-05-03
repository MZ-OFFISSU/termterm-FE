import styled from "styled-components/native";
import FilterLogo from "./FilterLogo";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import { useFilter } from "@hooks/useFilter";
import { TYPO_STYLE, colorTheme } from "@style/designSystem";

interface Props {
  navigateHandler: () => void;
}

const Filter = ({ navigateHandler }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { filterArr } = useFilter();

  const [curColor, setColor] = useState(COLOR.Neutral[100]);

  const settingColor = () => {
    if (filterArr.length === 0)
      mode ? setColor(COLOR.Neutral[100]) : setColor(COLOR.Neutral[100]);
    else setColor(COLOR.THEME.primary[130]);
  };

  useEffect(() => {
    settingColor();
  }, [filterArr]);

  return (
    <FilterButton onPress={navigateHandler}>
      <FilterLogo color={curColor} />
      {filterArr.length > 0 ? (
        <CilrcleWrapper COLOR={COLOR}>
          <NumberTypo>{filterArr.length}</NumberTypo>
        </CilrcleWrapper>
      ) : (
        <></>
      )}
    </FilterButton>
  );
};

const FilterButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const CilrcleWrapper = styled.View<{ COLOR: colorTheme }>`
  width: 11px;
  height: 11px;
  border-radius: 500px;
  background-color: ${(props) => props.COLOR.THEME.primary[130]};
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 3px;
  right: -1px;
`;

const NumberTypo = styled.Text`
  ${TYPO_STYLE.Caption[3].SemiBold};
  color: white;
  position: relative;
  top: 0.5px;
  left: 0.5px;
`;

export default Filter;
