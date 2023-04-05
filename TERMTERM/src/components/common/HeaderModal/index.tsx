import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import styled from "styled-components/native";
import { ViewProps, Platform } from "react-native";

interface Props extends ViewProps {
  id: number;
}

const MODAL_MENUS = ["공유", "수정", "삭제"];

const HeaderModal = ({ id, ...props }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <ModalContainer
      COLOR={COLOR}
      style={{
        borderColor: "rgba(0, 0, 0, 0.133)",
        ...Platform.select({
          ios: {
            shadowColor: "rgba(0, 0, 0, 0.133)",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
          },
          android: {
            elevation: 1,
          },
        }),
      }}
      {...props}
    >
      {MODAL_MENUS.map((menu) => (
        <ModalMenu key={menu}>
          <Menu COLOR={COLOR} mode={mode}>
            {menu}
          </Menu>
        </ModalMenu>
      ))}
    </ModalContainer>
  );
};

const ModalContainer = styled.View<{ COLOR: colorTheme }>`
  width: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.COLOR.Background.surface};
  position: absolute;
  top: 0px;
  right: 10px;
`;

const ModalMenu = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.Text<{ COLOR: colorTheme; mode: boolean }>`
  font-size: ${TEXT_STYLES["2xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["2xsm"].Md?.fontWeight};
  color: ${(props) =>
    props.mode ? props.COLOR.Text.darken : props.COLOR.Text.lighten};
`;

export default HeaderModal;
