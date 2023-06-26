import { View, ViewProps } from "react-native";
import styled from "styled-components/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "@style/dimensions";
import { WtProps } from "@interfaces/walkthrough";
import { useThemeStyle } from "@hooks/useThemeStyle";
import Walkthrough from "./Walkthrough";

interface Props extends ViewProps {
  walkthrough: Array<WtProps>;
  dots?: boolean;
}

/**
 * 워크스루 캐러셀 컴포넌트
 * dots가 있으면 좋겠다면, true
 */
const WalkthroughCarousel = ({ walkthrough, dots, ...props }: Props) => {
  const progressValue = useSharedValue<number>(0);
  const [COLOR, mode] = useThemeStyle();
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: 700,
  } as const;

  return (
    <View
      style={{
        alignItems: "center",  
      }}
      {...props}
    >
      {dots && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 50,
            marginTop: 30,
            alignSelf: "center",
          }}
        >
          {walkthrough.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor={COLOR.THEME.primary[130]}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={walkthrough.length}
              />
            );
          })}
        </View>
      )}
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
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
        }}
        data={walkthrough}
        renderItem={({ index }) => <Walkthrough walkthrough={walkthrough[index]} />}
      />
    </View>
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
  const width = 8;

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

export default WalkthroughCarousel;