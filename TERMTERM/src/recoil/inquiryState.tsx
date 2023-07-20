import { atom } from "recoil";

export interface InquiryInfo {
  email: string;
  inquiryType: string;
  inquiryContent: string;
}

const defaultInquiry: InquiryInfo = {
  email: "",
  inquiryType: "",
  inquiryContent: "",
}

export const inquiryState = atom<InquiryInfo>({
  key: "inquiryInfo",
  default: defaultInquiry,
})