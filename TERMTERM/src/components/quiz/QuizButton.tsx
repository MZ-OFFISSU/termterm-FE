import { LIGHT_COLOR_STYLE } from '@style/designSystem';
import React from 'react';
import styled from 'styled-components/native';

interface QuizButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  active: boolean;
}

const QuizButton = ({ onPress, children, active, ...props }: QuizButtonProps) => {
  return (
    <StyledQuizButton
      active={active}
      onPress={onPress}
      {...props}
    >
      {children}
    </StyledQuizButton>
  );
};

const StyledQuizButton = styled.TouchableOpacity<{ active: boolean }>`
  width: 100%;
  height: 47px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  margin: 5px auto;
  background-color: ${(props) => (props.active ? `${LIGHT_COLOR_STYLE.THEME.secondary[70]}` : 'transparent')};
  border-color: ${(props) => (props.active ? `${LIGHT_COLOR_STYLE.THEME.secondary[120]}` : `${LIGHT_COLOR_STYLE.Background.inputBorderDefault}`)}
`;

export default QuizButton;
