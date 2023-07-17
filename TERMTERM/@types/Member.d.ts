declare module "Member" {
  export type MemberInfo = {
    categories: string[];
    domain: string;
    email: string;
    introduction: string;
    job: string;
    memberId: number;
    name: string;
    nickname: string;
    point: number;
    profileImage: string;
    yearCareer: number;
  };

  export type ModifiedMemberInfo = {
    domain: string;
    introduction: string;
    job: string;
    nickname: string;
    yearCareer: number;
  };
}
