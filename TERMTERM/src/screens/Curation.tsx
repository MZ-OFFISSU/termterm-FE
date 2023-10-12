import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { CurationItem, CurationSelector } from "@components/curation";
import { useEffect, useState } from "react";
import { CurationItemProps } from "@interfaces/curation";
import { colorTheme } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useCuration } from "@hooks/useCuration";

export type Props = StackScreenProps<RootStackParamList, "Curation">;

const curationItems = [
  "추천",
  "기획",
  "마케팅",
  "개발",
  "디자인",
  "비즈니스",
  "IT",
];

const Curation = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { categoryCurationList } = useCuration();

  return (
    <Container COLOR={COLOR}>
      <ContentWrapper>
        <CurationSelector items={curationItems} />
        <CurationCardWrapper>
          {categoryCurationList.map((item, idx) => (
            <CurationItem
              {...item}
              onMove={() =>
                navigation.push("CurationDetail", { id: item.curationId })
              }
              key={item.thumbnail}
              img={item.thumbnail}
              item={item}
              style={{ marginTop: 30 }}
            />
          ))}
        </CurationCardWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px 50px 20px;
`;

const CurationCardWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default Curation;
