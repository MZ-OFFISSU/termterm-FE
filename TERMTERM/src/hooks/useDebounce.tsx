import { useState, useEffect } from "react";

// 디바운싱 훅
export const useDebounce = (
  callback: () => void,
  dependency: string,
  delay: number
): [boolean] => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      callback();
      setLoading(false);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [dependency, delay]);

  return [loading];
};
