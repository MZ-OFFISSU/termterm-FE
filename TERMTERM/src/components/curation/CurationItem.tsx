import { CurationItemProps } from "@interfaces/curation";
import styled from "styled-components/native";
import { TEXT_STYLES } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";

const CurationItem = ({ title, img, counts, marked }: CurationItemProps) => {
  const [COLOR] = useThemeStyle();
  return (
    <ItemContainer>
      <CurationTitle COLOR={COLOR}>{title}</CurationTitle>
      <CurationThumbnail>
        <CurationImage source={{ uri: img }} />
      </CurationThumbnail>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const CurationTitle = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: ${TEXT_STYLES.md2.Md?.fontWeight};
  color: ${(props) => props.COLOR.Text.darken};
`;

const CurationThumbnail = styled.TouchableOpacity`
  width: 100%;
  height: 115px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CurationImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export default CurationItem;
