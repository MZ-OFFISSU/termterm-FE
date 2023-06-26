import styled from "styled-components/native";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { FolderProps } from "@interfaces/bookmark";

interface Props extends FolderProps {
  onOpen: (id: number) => void;
}

const FOLDER_ICON = [
  require("@assets/folders/light.png"),
  require("@assets/folders/yellow.png"),
  require("@assets/folders/gray.png"),
];

const Folder = ({ onOpen, id, name, icon }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <FolderWrapper onPress={() => onOpen(id)}>
      <AutoSizedImage source={FOLDER_ICON[icon]} width={90} />
      <FolderInfo COLOR={COLOR}>{name}</FolderInfo>
    </FolderWrapper>
  );
};

const FolderWrapper = styled.TouchableOpacity`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7px;
`;

const FolderInfo = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 10px;
`;

export default Folder;
