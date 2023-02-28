import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import { ViewProps, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { colorTheme } from "@style/designSystem";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

/** dummy screen func. Home */
function HomeScreen() {
  return <Text>Home</Text>;
}

/** dummy screen func. Search */
function SearchScreen() {
  return <Text>Search</Text>;
}

/** dummy screen func. Archive */
function ArchiveScreen() {
  return <Text>Archive</Text>;
}

/** dummy screen func. My */
function MyScreen() {
  return <Text>My</Text>;
}

/**
 * 툴바(바텀바) 컴포넌트
 */
const ToolBar = () => {
  /** tabNavigator 생성 */
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          title: '홈',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              style={{ color: focused ? "#1B1B1C" : "#1B1B1C" }}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen 
        name="Search"  
        component={SearchScreen}
        options={{
          headerShown: false,
          title: '검색',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="search"
              style={{ color: focused ? "#1B1B1C" : "#1B1B1C" }}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen 
        name="Archive" 
        component={ArchiveScreen} 
        options={{
          headerShown: false,
          title: '아카이브',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="archive"
              style={{ color: focused ? "#1B1B1C" : "#1B1B1C" }}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen  
        name="My" 
        component={MyScreen} 
        options={{
          headerShown: false,
          title: 'MY',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person"
              style={{ color: focused ? "#1B1B1C" : "#1B1B1C" }}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ToolBar;
