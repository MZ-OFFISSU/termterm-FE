import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Home, Search, Archive, My } from "./Toolbar/index";
import { TEXT_STYLES } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

/**
 * 툴바(바텀바) 컴포넌트
 */
const ToolBar = ({ ...props }: Props) => {
  /** tabNavigator 생성 */
  const Tab = createBottomTabNavigator();
  const [COLOR] = useThemeStyle();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLOR.Background.surface,
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: "홈",
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
          headerShown: false,
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
        component={Archive}
        options={{
          headerShown: false,
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
        component={My}
        options={{
          headerShown: false,
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
  font-size: ${TEXT_STYLES["4xsm"].Md?.fontSize}px;
  font-weight: ${TEXT_STYLES["4xsm"].Md?.fontWeight};
  color: ${(props) =>
    props.focused ? props.COLOR.Neutral[100] : props.COLOR.Neutral[40]};
`;

export default ToolBar;
