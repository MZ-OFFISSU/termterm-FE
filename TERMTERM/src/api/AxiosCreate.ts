import axios, { AxiosRequestConfig } from "axios";
import { CustomAxiosInterface, CommonResponse } from "AxiosCommon";
import { getAccessToken, updateRefreshToken } from "@utils/tokenHandler";
import { BASE_URL } from "./secret";

const apiClient: CustomAxiosInterface = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: `${BASE_URL}`,
});

// 요청 interceptor 정의
apiClient.interceptors.request.use(
  async (config: any) => {
    const token = await getAccessToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error: unknown) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 interceptor 정의
apiClient.interceptors.response.use(
  async (config: any) => {
    return config;
  },
  async (error: any) => {
    if (error.response.status === 400) {
      //JWT 에러 발생시 토큰 갱신
      await updateRefreshToken();
    }
    return Promise.reject(error);
  }
);

const Get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<CommonResponse<T>>(url, config);
  return response.data.data;
};

const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<CommonResponse<T>>(url, data, config);
  return response.data.data;
};

const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<CommonResponse<T>>(url, data, config);
  return response.data.data;
};

const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.patch<CommonResponse<T>>(url, data, config);
  return response.data.data;
};

const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<CommonResponse<T>>(url, config);
  return response.data.data;
};

export {
  Get as get,
  Post as post,
  Put as put,
  Patch as patch,
  Delete as remove,
};
