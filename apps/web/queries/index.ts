import { ExchangeRateResponse, SaveApparelDTO } from '@shared';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

type SupportedApiOperations =
  | 'get'
  | 'post'
  | 'postForm'
  | 'patch'
  | 'put'
  | 'delete';

const ApiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getQueryFn = async <T>(
  url: string,
  config: AxiosRequestConfig & { method?: SupportedApiOperations } = {}
): Promise<T> => {
  return ApiService({ url, ...config }).then(({ data }) => data);
};

export const useApparelQuery = () => {
  return useQuery({
    queryFn: () => getQueryFn<SaveApparelDTO>(`/apparel`),
    queryKey: ['apparel'],
    retry(_, error) {
      if (error instanceof AxiosError && error.status == 404) {
        return false;
      }
      return true;
    },
  });
};

export const useApparelMutation = () => {
  return useMutation({
    mutationFn: (payload: SaveApparelDTO) =>
      getQueryFn<void>(`/apparel`, { method: 'post', data: payload }),
  });
};

export const useExchangeRatesQuery = () => {
  return useQuery({
    queryFn: () => getQueryFn<ExchangeRateResponse>(`/exchange-rates`),
    queryKey: ['exchange-rates'],
    retry(_, error) {
      if (error instanceof AxiosError && error.status == 404) {
        return false;
      }
      return true;
    },
  });
};
