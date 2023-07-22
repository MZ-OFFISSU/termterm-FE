import { useState, useEffect } from "react";

interface HideWordResult {
  hiddenExplain: string;
}

const useHideWord = (explain: string, word: string): HideWordResult => {
  const [hiddenExplain, setHiddenExplain] = useState("");

  useEffect(() => {
    const updatedExplain = explain.replace(word, "○○");
    setHiddenExplain(updatedExplain);
  }, [explain, word]);

  return { hiddenExplain };
};

export default useHideWord;
