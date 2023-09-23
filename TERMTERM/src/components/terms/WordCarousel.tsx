import { View, ViewProps } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "@style/dimensions";
import { WordProps } from "@interfaces/word";
import WordCard from "./WordCard";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props extends ViewProps {
  words: Array<WordProps>;
  dots?: boolean;
  snap?: (idx: number) => void;
  touchable?: boolean;
}

/**
 * 단어 캐러셀 컴포넌트
 * dots가 있으면 좋겠다면, true
 */
const WordCarousel = ({
  words,
  dots,
  snap,
  touchable = true,
  ...props
}: Props) => {
  const progressValue = useSharedValue<number>(0);
  const [COLOR, mode] = useThemeStyle();
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: 355,
  } as const;

  /**---네비게이션 관련 ---*/
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToTermDetail = (id: number) => {
    navigation.push("TermDetail", { id: `${id}` });
  };

  const moveToDetail = (index: number) => {
    if (touchable) navigateToTermDetail(words[index].termId);
  };

  return (
    <View
      style={{
        alignItems: "center",
      }}
      {...props}
    >
      <Carousel
        {...baseOptions}
        style={{
          width: screenWidth,
        }}
        loop={words.length > 1}
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
        data={words}
        renderItem={({ index }) => (
          <WordCard
            word={words[index] as any}
            onPress={() => moveToDetail(index)}
          />
        )}
      />
      {dots && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          {words.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor={COLOR.THEME.primary[130]}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={words.length}
              />
            );
          })}
        </View>
      )}
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
        marginLeft: index !== 0 ? 3 : 0,
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

export default WordCarousel;
