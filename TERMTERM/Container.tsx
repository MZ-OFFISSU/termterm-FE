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
  EditProfile,
  MyPoint,
  Notification,
  ThemeSelect,
  DeleteAccount,
  Walkthrough,
  Support,
  TermDetail,
  ReportWord,
  MyWordApply,
  TermsDetail,
  QuizIntro,
  QuizResult,
  QuizReview,
  FilterScreen,
  EditFolder,
} from "@screens/index";
import ToolBar from "@screens/ToolBar";
import {
  BackBar,
  BookmarkBar,
  CarouselBar,
  BookmarkSingleBar,
  XBar,
} from "@components/header";
import { IconBar, Icon } from "@components/header";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { SafeAreaView, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AllTerms from "@screens/AllTerms";
import { useRecoilValue } from "recoil";
import { safeAreaColorState } from "@recoil/safeAreaColor";
import Filter from "@components/common/Filter";
import KakaoLogin from "@screens/Webview/KakaoLogin";
import GoogleLogin from "@screens/Webview/GoogleLogin";
import Third from "@screens/Support/Third";

const RootStack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

/**
 * 앱 로딩 완료 후 (스플래시 종료 후),
 * 네비게이션 콘테이너를 감싸는 코드
 */
const Container = () => {
  const [isReady, setIsReady] = useState(false);
  const [quizIdx, setQuizIdx] = useState(1);
  const safeColor = useRecoilValue(safeAreaColorState);

  const getFonts = async () => {
    await Font.loadAsync({
      "SUIT-Thin": require("./assets/fonts/SUIT-Thin.ttf"),
      "SUIT-ExtraLight": require("./assets/fonts/SUIT-ExtraLight.ttf"),
      "SUIT-Light": require("./assets/fonts/SUIT-Light.ttf"),
      "SUIT-Regular": require("./assets/fonts/SUIT-Regular.ttf"),
      "SUIT-Medium": require("./assets/fonts/SUIT-Medium.ttf"),
      "SUIT-SemiBold": require("./assets/fonts/SUIT-SemiBold.ttf"),
      "SUIT-Bold": require("./assets/fonts/SUIT-Bold.ttf"),
      "SUIT-ExtraBold": require("./assets/fonts/SUIT-ExtraBold.ttf"),
      "SUIT-Heavy": require("./assets/fonts/SUIT-Heavy.ttf"),
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 렌더링 사전준비 완료
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      //로딩 이후 스플래시 화면 숨김
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView
      onLayout={onLayoutRootView}
      style={{ flex: 1, width: "100%", backgroundColor: safeColor.bgColor }}
    >
      <StatusBar barStyle={safeColor.styleColor} />
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Walkthrough">
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
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    // TODO : quizIdx 로직 추가
                    title={`${quizIdx}/5`}
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="CompleteQuiz"
            component={CompleteQuiz}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Walkthrough"
            component={Walkthrough}
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
            name="EditFolder"
            component={EditFolder}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="폴더 수정"
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
                      props.navigation.navigate("FolderDetailCollapse", {
                        id: 0,
                      })
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
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="프로필 수정"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="MyPoint"
            component={MyPoint}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="내 포인트"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="알림 설정"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="ThemeSelect"
            component={ThemeSelect}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="테마 변경"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="DeleteAccount"
            component={DeleteAccount}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="탈퇴하기"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="Support"
            component={Support}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="문의하기"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="AllTerms"
            component={AllTerms}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="전체 용어"
                    onBack={() => props.navigation.pop()}
                    Icon={
                      <Filter
                        navigateHandler={() =>
                          props.navigation.push("FilterScreen")
                        }
                      />
                    }
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
                  <BookmarkBar
                    onBack={() => props.navigation.goBack()}
                    onBookmark={() => null}
                    onShare={() => null}
                    bookmarked={false}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="ReportWord"
            component={ReportWord}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="의견 신고"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="MyWordApply"
            component={MyWordApply}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="용어 설명 신청"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="TermsDetail"
            component={TermsDetail}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <CarouselBar
                    onBack={() => props.navigation.pop()}
                    onBookmark={() => null}
                    onShare={() => null}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="FilterScreen"
            component={FilterScreen}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <XBar title="필터" onBack={() => props.navigation.pop()} />
                );
              },
            }}
          />
          <RootStack.Screen
            name="QuizIntro"
            component={QuizIntro}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar title="" onBack={() => props.navigation.pop()} />
                );
              },
            }}
          />
          <RootStack.Screen
            name="Kakao"
            component={KakaoLogin}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Google"
            component={GoogleLogin}
            options={{
              headerShown: false,
            }}
          />

          <RootStack.Screen
            name="QuizResult"
            component={QuizResult}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="정답 확인"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="QuizReview"
            component={QuizReview}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BookmarkSingleBar
                    title="용어 퀴즈 리뷰"
                    onBack={() => props.navigation.pop()}
                    onBookmark={() => null}
                    bookmarked={false}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            name="Third"
            component={Third}
            options={{
              headerShown: true,
              header: (props) => {
                return (
                  <BackBar
                    title="문의하기"
                    onBack={() => props.navigation.pop()}
                  />
                );
              },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Container;
