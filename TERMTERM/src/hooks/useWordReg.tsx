import { useEffect, useState } from "react";

type SplitResult = [string | null, string | null];

export function useWordReg(source: string): SplitResult {
  const [sub, setSub] = useState<string | null>(null);
  const [main, setMain] = useState<string | null>(null);

  useEffect(() => {
    const match = source.split(" :: ");
    if (match.length > 1) {
      setSub(match[0]);
      setMain(match[1]);
    }
  }, [source]);

  return [sub, main];
}
