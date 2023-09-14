import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  bookmarkHeaderState,
  bookmarkModalInfo,
  bookmarkTermId,
  isBookmarkCuration,
} from "@recoil/bookmarkState";
import { useRecoilState } from "recoil";
import { useCuration } from "./useCuration";
import { useHaptics } from "./useHaptics";

export const useBookmarkHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [bookmarked, setBookmarked] = useRecoilState(bookmarkHeaderState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(bookmarkModalInfo);
  const [termId, setTermId] = useRecoilState(bookmarkTermId);
  const [curationId, setCurationId] = useRecoilState(isBookmarkCuration);
  const { bookmarkCuration, deleteCurationBookmark } = useCuration();

  const { haptic } = useHaptics();

  const settingCurationId = (id: number) => {
    setCurationId(id);
  };

  const handleCuration = async () => {
    try {
      haptic("light");
      if (bookmarked) {
        await deleteCurationBookmark(curationId);
        setBookmarked(false);
      } else {
        await bookmarkCuration(curationId);
        setBookmarked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setDefaultBookmarkState = (curTerm: boolean) => {
    setBookmarked(curTerm);
  };

  const handleBookmarkState = (isCuration?: boolean) => {
    if (isCuration) {
      handleCuration();
    } else {
      if (bookmarked) {
        setIsModalOpen(true);
      } else {
        navigation.push("SelectFolder", { termId });
      }
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
    settingCurationId,
  };
};
