import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  bookmarkHeaderState,
  bookmarkModalInfo,
  bookmarkTermId,
} from "@recoil/bookmarkState";
import { useRecoilState } from "recoil";

export const useBookmarkHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [bookmarked, setBookmarked] = useRecoilState(bookmarkHeaderState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(bookmarkModalInfo);
  const [termId, setTermId] = useRecoilState(bookmarkTermId);

  const setDefaultBookmarkState = (curTerm: boolean) => {
    setBookmarked(curTerm);
  };

  const handleBookmarkState = () => {
    if (bookmarked) {
      setIsModalOpen(true);
    } else {
      navigation.push("SelectFolder", { termId });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    bookmarked,
    isModalOpen,
    setDefaultBookmarkState,
    handleBookmarkState,
    closeModal,
    setTermId,
  };
};
