interface HideWordResult {
  hiddenExplain: string;
}

const useQuizExplain = (explain: string): HideWordResult => {
  const hiddenExplain = explain.replace(/@@(.*?)@@/g, "OO");

  return { hiddenExplain };
}

export default useQuizExplain;