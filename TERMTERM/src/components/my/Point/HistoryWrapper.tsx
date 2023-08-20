import { useThemeStyle } from "@hooks/useThemeStyle";
import { PointHistory } from "@interfaces/point";
import { colorTheme, LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { useEffect, useState } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import HistoryBox from "./HistoryBox";
import { screenWidth } from "@style/dimensions";
import { Entypo } from "@expo/vector-icons";
import { usePoint } from "@hooks/usePoint";
import { PointHistoryContent } from "Point";

/**
 * 포인트 사용내역의 wrapper 컴포넌트
 */
const HistoryWrapper = ({ ...props }: ViewProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [histories, setHistories] = useState<Array<PointHistoryContent>>();
  const [visible, setVisible] = useState<number>(0);
  const [max, setMax] = useState(false);

  const { history } = usePoint();

  /**
   * 시간 순으로 정렬
   */
  const sortDated = (data: Array<PointHistoryContent>) => {
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
    if (!history) setHistories([]);
    else {
      sortDated(history);
      dummyHistories.length > 5
        ? setVisible(5)
        : setVisible(dummyHistories.length);
    }
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
      {max && history ? (
        <Button COLOR={COLOR} mode={mode} onPress={() => onVisible()}>
          <ButtonContent>더보기</ButtonContent>
          <Entypo name="chevron-down" size={24} color="white" />
        </Button>
      ) : (
        <EmptyBox>
          <EmptyText COLOR={COLOR}>아직 포인트 사용내역이 없어요</EmptyText>
        </EmptyBox>
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
  ${TYPO_STYLE.Body[2].Bold};
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
  background-color: ${(props) => props.COLOR.Neutral[10]};
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
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
  margin-right: 8px;
`;

const EmptyBox = styled.View`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Subheading[1].Medium};
  color: ${(props) => props.COLOR.Text.default};
  text-align: center;
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
