import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { BookmarkedCurations, BookmarkedTerms } from "@components/archive";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const TYPES = ["용어", "큐레이션"];
const TYPES_WRAPPER = [BookmarkedTerms, BookmarkedCurations] as const;

const Archive = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curType, setCurType] = useState(0);
  const CurComponents = TYPES_WRAPPER[curType];

  return (
    <Container COLOR={COLOR}>
      <TypeSelector>
        {TYPES.map((type, idx) => (
          <TouchableOpacity
            key={type}
            onPress={() => setCurType(idx)}
            style={{ marginLeft: idx !== 0 ? 15 : 0 }}
          >
            <Type selected={curType === idx}>{type}</Type>
          </TouchableOpacity>
        ))}
      </TypeSelector>
      <CurComponents type={TYPES[curType]} />
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 16px;
`;

const TypeSelector = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Type = styled.Text<{ selected: boolean }>`
  font-size: ${(props) =>
    props.selected
      ? TEXT_STYLES.md2.Bd?.fontSize
      : TEXT_STYLES.md2.Reg?.fontSize}px;
  font-weight: ${(props) =>
    props.selected
      ? TEXT_STYLES.md2.Bd?.fontWeight
      : TEXT_STYLES.md2.Reg?.fontWeight};
`;
export default Archive;
