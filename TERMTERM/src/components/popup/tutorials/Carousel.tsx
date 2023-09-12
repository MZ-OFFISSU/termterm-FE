import { screenWidth } from "@style/dimensions";
import { useState } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import TutorialItem from "./TutorialItem";
import { useThemeStyle } from "@hooks/useThemeStyle";

const TutorialCarousel = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [COLOR, mode] = useThemeStyle();
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: 355,
    lineHeight: 24,
  } as const;

  const snap = (idx: number) => {
    setCurIdx(idx);
  };

  const items = [
    {
      content: "/bDaily 용어 퀴즈/b를 풀면서\n용어를 학습해보세요!",
      img: mode
        ? require("@assets/tutorials/carousel/light-1.png")
        : require("@assets/tutorials/carousel/dark-1.png"),
    },
    {
      content: "틀렸던 문제는 /b복습 퀴즈/b로\n다시 볼 수 있어요!",
      img: mode
        ? require("@assets/tutorials/carousel/light-2.png")
        : require("@assets/tutorials/carousel/dark-2.png"),
    },
    {
      content: "그날 풀었던 문제를 보면서\n/b다시 한 번 학습/b해 보세요!",
      img: mode
        ? require("@assets/tutorials/carousel/light-3.png")
        : require("@assets/tutorials/carousel/dark-3.png"),
    },
    {
      content: "기본 제공되는 500포인트로\n/btermterm/b을 둘러보세요!",
      img: mode
        ? require("@assets/tutorials/carousel/light-4.png")
        : require("@assets/tutorials/carousel/light-4.png"),
      subContent:
        "큐레이션의 용어를 더 보고 싶거나\n폴더를 3개 이상 만들 때\n포인트를 사용할 수 있어요!",
    },
  ];

  return (
    <>
      <Carousel
        {...baseOptions}
        style={{
          width: screenWidth,
        }}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        onSnapToItem={snap}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
        }}
        data={items}
        renderItem={({ index }) => <TutorialItem {...items[index]} />}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 50,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        {items.map((_, index) => {
          return (
            <PaginationItem
              backgroundColor={COLOR.THEME.primary[130]}
              animValue={progressValue}
              index={index}
              isRotate={false}
              length={items.length}
              key={_.content}
            />
          );
        })}
      </View>
    </>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 6;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "#bdbdbd51",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default TutorialCarousel;
