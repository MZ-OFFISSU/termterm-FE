declare module "Quiz" {
  export type QuizDetail = {
    options: QuizOption[];
    termDescription: string;
    termId: number;
    termName: string;
    termSource: string;
  };

  export type QuizOption = {
    isAnswer: boolean;
    optionName: string;
    termId: number;
  };

  export type QuizReview = {
    bookmarked: "NO" | "YES";
    isAnswerRight: boolean;
    termDescription: string;
    termId: number;
    termName: string;
    termSource: string;
    wrongChoices: string[];
  };

  enum QuizType {
    DAILY = "DAILY",
    REVIEW = "REVIEW",
  }

  export type QuizResult = {
    memberSelectedTermId: number;
    problemTermId: number;
  };

  export type QuizSubmit = {
    quizType: QuizType;
    results: QuizResult[];
  };

  export type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}
