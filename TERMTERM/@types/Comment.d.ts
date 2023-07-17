declare module "Comment" {
  export type CommentInput = {
    content: string;
    source: string;
    termId: number;
  };

  enum ReportType {
    COPYRIGHT = "COPYRIGHT",
    PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
    ADVERTISEMENT = "ADVERTISEMENT",
    IRRELEVANT_CONTENT = "IRRELEVANT_CONTENT",
    FRAUD = "FRAUD",
    INCORRECT_CONTENT = "INCORRECT_CONTENT",
    DISGUST = "DISGUST",
    ABUSE = "ABUSE",
    SPAM = "SPAM",
    OTHER = "OTHER",
  }

  export type Report = {
    commentId: number;
    content: string;
    type: ReportType;
  };
}
