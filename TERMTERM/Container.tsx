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
} from "@screens/index";
import ToolBar from "@screens/ToolBar";

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
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CurationDetail"
          component={CurationDetail}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
