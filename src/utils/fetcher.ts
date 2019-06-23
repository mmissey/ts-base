import path from 'path';

const BASE_URL = 'api.imgur.com/3';

const getAuthToken = (): string => {
  if (process.env.IMGUR_API_AUTH) {
    return process.env.IMGUR_API_AUTH;
  }
  return '';
};

type Fetcher = (
  path: string,
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

export const fetcher: Fetcher = (
  endpoint,
  { method = 'GET', body, query} = {}
) => {

  const url = `https://${path.join(BASE_URL, endpoint)}${(query && buildQuery(query)) || ''}`;

  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      Authorization: `Client-ID ${getAuthToken()}`
    }),
  });
};

export default fetcher;;
