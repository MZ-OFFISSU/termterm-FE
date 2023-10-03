interface ExplainResult {
  filteredExplain: string;
}

const useRemoveChar = (explain: string): ExplainResult => {
  const filteredExplain = explain.replace(/@@/g, "");

  return { filteredExplain };
}

export default useRemoveChar;