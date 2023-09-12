import CommentApi from "@api/CommentApi";
import { useMember } from "./useMember";
import { useState } from "react";
import { booleanConverter } from "@utils/booleanConverter";
import { useHaptics } from "./useHaptics";

export const useCommentLike = (liked: string, likeCnt: number) => {
  const commentApi = new CommentApi();
  const { user } = useMember();
  const [cnt, setCnt] = useState(likeCnt);
  const [isLiked, setIsLiked] = useState(booleanConverter(liked));
  const { haptic } = useHaptics();

  const isMyComment = (name: string) => {
    return name === user.info?.name;
  };

  const handleLike = async (id: number, liked: boolean) => {
    try {
      haptic("light");
      if (liked) {
        await commentApi.dislikeComment(id);
        setIsLiked(false);
        setCnt((prev) => prev - 1);
      } else {
        await commentApi.likeComment(id);
        setIsLiked(true);
        setCnt((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { isMyComment, handleLike, cnt, isLiked };
};
