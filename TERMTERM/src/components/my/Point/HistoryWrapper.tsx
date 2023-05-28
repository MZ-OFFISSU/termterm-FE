import { useThemeStyle } from "@hooks/useThemeStyle";
import { PointHistory } from "@interfaces/point";
import {
  colorTheme,
  LIGHT_COLOR_STYLE,
  TEXT_STYLES,
} from "@style/designSystem";
import { useEffect, useState } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import HistoryBox from "./HistoryBox";
import { screenWidth } from "@style/dimensions";
import { Entypo } from "@expo/vector-icons";

/**
 * 포인트 사용내역의 wrapper 컴포넌트
 */
const HistoryWrapper = ({ ...props }: ViewProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [histories, setHistories] = useState<Array<PointHistory>>();
  const [visible, setVisible] = useState<number>(0);
  const [max, setMax] = useState(false);

  /**
   * 시간 순으로 정렬
   */
  const sortDated = (data: Array<PointHistory>) => {
    const sortedHistories = data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setHistories(sortedHistories);
  };

  const onVisible = () => {
    if (visible + 5 > histories!.length) {
      setVisible(histories!.length);
      setMax(true);
    } else {
      setVisible((prev) => prev + 5);
      setMax(false);
    }
  };

  useEffect(() => {
    sortDated(dummyHistories);
    dummyHistories.length > 5
      ? setVisible(5)
      : setVisible(dummyHistories.length);
  }, []);

  return (
    <Container {...props}>
      <TitleBox COLOR={COLOR}>포인트 사용 내역</TitleBox>
      {histories ? (
        histories.slice(0, visible).map((history, idx) => (
          <Wrapper key={history.date}>
            <HistoryBox history={history} />
            {idx === visible - 1 ? <></> : <Line COLOR={COLOR} />}
          </Wrapper>
        ))
      ) : (
        <></>
      )}
      {max ? (
        <></>
      ) : (
        <Button COLOR={COLOR} mode={mode} onPress={() => onVisible()}>
          <ButtonContent>더보기</ButtonContent>
          <Entypo name="chevron-down" size={24} color="white" />
        </Button>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TitleBox = styled.Text<{ COLOR: colorTheme }>`
  width: 100%;
  text-align: start;
  font-size: ${TEXT_STYLES.md2.Bd?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Bd?.fontWeight};
  color: ${(props) => props.COLOR.Text.active};
`;

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View<{ COLOR: colorTheme }>`
  width: ${screenWidth}px;
  height: 1px;
  background-color: ${(props) => props.COLOR.Neutral[20]};
`;

const Button = styled.TouchableOpacity<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.mode ? props.COLOR.Neutral[100] : props.COLOR.Neutral[10]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonContent = styled.Text`
  font-size: ${TEXT_STYLES.md2.Sb?.fontSize}rem;
  font-weight: ${TEXT_STYLES.md2.Sb?.fontWeight};
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

export default HistoryWrapper;

const dummyHistories: Array<PointHistory> = [
  {
    date: "2023.04.15",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: 20,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: -30,
      },
    ],
  },
  {
    date: "2023.04.16",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: 10,
      },
    ],
  },
  {
    date: "2023.04.17",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
    ],
  },
  {
    date: "2023.04.18",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
    ],
  },
  {
    date: "2023.04.19",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
      {
        desc: "큐레이션 용어 더보기",
        amount: 10,
      },
    ],
  },
  {
    date: "2023.04.20",
    details: [
      {
        desc: "큐레이션 용어 더보기",
        amount: -10,
      },
    ],
  },
];
