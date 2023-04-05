import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import {
  Curation,
  Login,
  Onboarding,
  DailyQuiz,
  CompleteQuiz,
  CurationDetail,
  MakeFolder,
  FolderDetailGlance,
  FolderDetailCollapse,
  TermDetail,
  TermDiscussion,
} from "@screens/index";
import ToolBar from "@screens/ToolBar";
import { BackBar, BookmarkBar } from "@components/header";
import { IconBar, Icon } from "@components/header";

const RootStack = createStackNavigator<RootStackParamList>();

/**
 * 앱 로딩 완료 후 (스플래시 종료 후),
 * 네비게이션 콘테이너를 감싸는 코드
 */
const Container = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ToolBar"
          component={ToolBar}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="DailyQuiz"
          component={DailyQuiz}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CompleteQuiz"
          component={CompleteQuiz}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Curation"
          component={Curation}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <BackBar
                  title="전체 큐레이션"
                  onBack={() => props.navigation.pop()}
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="CurationDetail"
          component={CurationDetail}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <BookmarkBar
                  onBack={() => props.navigation.pop()}
                  onBookmark={() => null}
                  onShare={() => null}
                  bookmarked={false}
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="MakeFolder"
          component={MakeFolder}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <BackBar
                  title="폴더 만들기"
                  onBack={() => props.navigation.pop()}
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="FolderDetailGlance"
          component={FolderDetailGlance}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <IconBar
                  onBack={() => props.navigation.pop()}
                  icon={Icon.collapse}
                  onPress={() =>
                    props.navigation.navigate("FolderDetailCollapse", { id: 0 })
                  }
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="FolderDetailCollapse"
          component={FolderDetailCollapse}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <IconBar
                  onBack={() => props.navigation.pop()}
                  icon={Icon.fold}
                  onPress={() =>
                    props.navigation.navigate("FolderDetailGlance", { id: 0 })
                  }
                  bookmarkBar={true}
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="TermDetail"
          component={TermDetail}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <IconBar
                  onBack={() => props.navigation.pop()}
                  icon={Icon.collapse}
                  onPress={() =>
                    props.navigation.navigate("TermDetail", { id: 0 })
                  }
                />
              );
            },
          }}
        />
        <RootStack.Screen
          name="TermDiscussion"
          component={TermDiscussion}
          options={{
            headerShown: true,
            header: (props) => {
              return (
                <IconBar
                  onBack={() => props.navigation.pop()}
                  icon={Icon.collapse}
                  onPress={() =>
                    props.navigation.navigate("TermDiscussion", { id: 0 })
                  }
                />
              );
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
