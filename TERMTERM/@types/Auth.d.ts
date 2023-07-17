declare module "Auth" {
  export type AuthResponse = {
    access_token: string;
    refresh_token: string;
  };
}
