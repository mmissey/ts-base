import path from 'path';
import getApiTarget from './env';

const BASE_URL = 'api.imgur.com/3';

const getAuthToken = (): string => {
  if (process.env.IMGUR_API_AUTH) {
    return process.env.IMGUR_API_AUTH;
  }
  return '';
};

const getClientId = (): string => {
  if (process.env.IMGUR_CLIENT_ID) {
    return process.env.IMGUR_CLIENT_ID;
  }
  return '';
};

type Fetcher = (
  path: string,
  importMock: () => Promise<any>,
  mockFn: (module: any) => any,
  opts?: {
    method?: 'GET' | 'PUT' | 'DELETE' | 'POST' | 'PATCH'
    query?: QueryObj,
    body?: any;

  }
) => Promise<any>;


const buildQuery = (query: QueryObj) =>
    Object.keys(query).reduce((queryString, key) =>
        queryString += `${queryString.length ? '&' : '?'}${key}=${query[key]}`
    , '')

const useMocks = (endpoint: string, apiTarget: string) =>
  (!endpoint || apiTarget === 'development' );
  
export const fetcher: Fetcher = (
  endpoint,
  importMock,
  mockFn,
  { method = 'GET', body, query} = {}
) => {
  const apiTarget = getApiTarget();

  if (useMocks(endpoint, apiTarget)) {
    return new Promise((resolve, reject) => mockFetcher(importMock(), mockFn, resolve, reject));
  }

  const url = `https://${path.join(BASE_URL, endpoint)}${(query && buildQuery(query)) || ''}`;

  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      Authorization: `Client-ID ${getClientId()}`
    }),
  });
};

type MockFetcher = (
  importFn: Promise<any>,
  mockFn: (module: any) => any,
  resolve: (...args: any[]) => void,
  reject: (...args: any[]) => void,
) => Promise<any>;

export const mockFetcher: MockFetcher = (importFn, mockFn, resolve, reject) => {
  return importFn.then((module: any) => {
    const mockResp = mockFn(module);

    const { timeout = 500 } = mockResp.meta;

    // could config to reject instead somehow if you want to test w/o internet
    setTimeout(() => {
      resolve({
        ok: mockResp.meta.ok,
        status: mockResp.meta.status || 200,
        statusText: mockResp.statusText || '',
        json() {
          if (!mockResp.json) {
            return Promise.reject(null);
          }

          // sometimes must do async stuff in the mock lib, see mock img upload
          if (mockResp.json instanceof Promise) {
            return mockResp.json;
          }

          return Promise.resolve(mockResp.json);
        },
        headers: new Headers(mockResp.headers || {}),
      });
    }, timeout);
  });
};

export default fetcher;
