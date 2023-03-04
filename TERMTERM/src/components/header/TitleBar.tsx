export interface Props {
  children: React.ReactNode;
}

/**
 * 타이틀이 왼쪽에 위치한 헤더
 * 자식 노드에 오른쪽에 위치한 요소를 배치할 수 있다.
 * 1~3번 헤더 컴포넌트
 */
const TitleBar = ({ children }: Props) => {
  return <>{children}</>;
};

export default TitleBar;
