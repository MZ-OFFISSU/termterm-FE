import { WordProps } from "@interfaces/word";

export const dummyWord: WordProps = {
  id: 0,
  name: "프로덕트 매니저 :: Product Manager",
  description:
    "제품의 라이프 사이클을 총 관리하는 사람이에요. 회사의 비전과 전략에 기여하기 위해 어떤 제품을 왜 개발해야 하는지 고민하고 실행하는 역할을 하고, 마케팅과 요구사항 수집을 통한 개발 초기에 관여하며, 테스팅과 생산, 업그레이드와 세일즈까지 제품이 고객 손에 들어가는 전체 라이프 사이클에 관여하기 때문에 그 제품, 서비스의 '미니 CEO' 라고도 불려요.",
  source: "https://www.jobindexworld.com/contents/view/7923",
  categories: [
    {
      id: 0,
      name: "기획",
    },
    {
      id: 1,
      name: "개발",
    },
  ],
  comments: [
    {
      id: 0,
      content:
        "기획자는 기획을 사람입니다. 기획자는 블라블라블라블라블라블라블라블라블라블라블라블블라 블라블블라 블라블블라",
      likeCnt: 4,
      authorName: "왈왈이",
      authorJob: "기획자",
      createdDate: "2023-03-16T16:41:23.468137",
    },
    {
      id: 1,
      content:
        "기획자는 기획을 사람입니다. 기획자는 블라블라블라블라블라블라블라블라블라블라블라블블라 블라블블라 블라블블라",
      likeCnt: 2,
      authorName: "왈왈이",
      authorJob: "기획자",
      createdDate: "2023-03-16T16:41:23.468137",
    },
    {
      id: 2,
      content:
        "기획자는 기획을 사람입니다. 기획자는 블라블라블라블라블라블라블라블라블라블라블라블블라 블라블블라 블라블블라",
      likeCnt: 2,
      authorName: "왈왈이",
      authorJob: "기획자",
      createdDate: "2023-03-16T16:41:23.468137",
    },
  ],
};

export const dummyWords: Array<WordProps> = [
  dummyWord,
  dummyWord,
  dummyWord,
  dummyWord,
  dummyWord,
  dummyWord,
  dummyWord,
  dummyWord,
];
