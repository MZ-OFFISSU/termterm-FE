import styled from "styled-components/native";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Home, Search, Archive, My } from "./Toolbar/index";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { HomeBar, TitleBar } from "@components/header";
import { Icon } from "@components/header/TitleBar";
import { useState } from "react";
import { useSafeColor } from "@hooks/useSafeColor";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

/**
 * 툴바(바텀바) 컴포넌트
 */
const ToolBar = ({ ...props }: Props) => {
  /** tabNavigator 생성 */
  const Tab = createBottomTabNavigator();
  const [COLOR, mode] = useThemeStyle();
  useSafeColor();

  //아카이브 스크린에서 사용할 모달 관련 state
  const [archiveModal, setArchiveModal] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLOR.Background.surface,
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
          borderTopColor: "#3c3c4353",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <Home {...props} />}
        options={{
          headerShown: true,
          title: "홈",
          header: (props) => {
            return (
              <HomeBar onSearch={() => props.navigation.navigate("Search")} />
            );
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              style={{
                color: focused ? COLOR.Neutral[100] : COLOR.Neutral[40],
              }}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} COLOR={COLOR}>
              홈
            </Label>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <Search {...props} />}
        options={{
          headerShown: true,
          header: (props) => {
            return <TitleBar title="검색" />;
          },
          title: "검색",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              style={{
                color: focused ? COLOR.Neutral[100] : COLOR.Neutral[40],
              }}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} COLOR={COLOR}>
              검색
            </Label>
          ),
        }}
      />

      <Tab.Screen
        name="Archive"
        children={() => (
          <Archive modal={archiveModal} setModal={setArchiveModal} {...props} />
        )}
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <TitleBar
                title="아카이브"
                icon={Icon.folder}
                onPress={() => setArchiveModal(true)}
              />
            );
          },
          title: "아카이브",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="archive"
              style={{
                color: focused ? COLOR.Neutral[100] : COLOR.Neutral[40],
              }}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} COLOR={COLOR}>
              아카이브
            </Label>
          ),
        }}
      />
      <Tab.Screen
        name="My"
        children={() => <My {...props} />}
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <TitleBar
                title="My"
                icon={0}
                point={10000}
                onPress={() => props.navigation.navigate("MyPoint")}
              />
            );
          },
          title: "MY",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              style={{
                color: focused ? COLOR.Neutral[100] : COLOR.Neutral[40],
              }}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Label focused={focused} COLOR={COLOR}>
              MY
            </Label>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Label = styled.Text<{ focused: boolean; COLOR: colorTheme }>`
  ${TYPO_STYLE.Caption[3].Medium};
  color: ${(props) =>
    props.focused ? props.COLOR.Neutral[100] : props.COLOR.Neutral[40]};
`;

export default ToolBar;
