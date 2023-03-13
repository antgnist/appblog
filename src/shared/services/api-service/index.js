/* eslint-disable max-classes-per-file */
class ResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ResponseError';
    this.status = status;
  }
}

export default class ApiService {
  #apiBase = 'https://blog.kata.academy/api';

  #searchId = '';

  #qureyAuth = '';

  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  fetchOptions = {
    method: 'GET',
    headers: this.headers,
    redirect: 'follow',
  };

  static formatTickets = () => {};

  getResource = async (
    url,
    query = '',
    controller = { signal: null },
    options = this.fetchOptions,
    apiBase = this.#apiBase,
  ) => {
    const res = await fetch(`${apiBase}${url}?${this.#qureyAuth}${query}`, {
      ...options,
      signal: controller.signal,
    });
    if (!res.ok)
      throw new ResponseError(
        `Could not fetch ${url}, recieved ${res.status}`,
        res.status,
      );
    const body = await res.json();
    return body;
  };

  getArticles = async (pageNumber) => {
    const offset =
      pageNumber === 1 || pageNumber === undefined ? 0 : (pageNumber - 1) * 5;
    try {
      return await this.getResource('/articles', `offset=${offset}&limit=5`);
    } catch (error) {
      console.error('Ошибка в getArticles: ', error);
      throw error;
    }
  };

  // getSearchId = async (controller) => {
  //   try {
  //     const res = await this.getResource('/search', '', controller);
  //     if (res.searchId) {
  //       return res.searchId;
  //     }
  //   } catch (error) {
  //     // console.log('Error with getResource');
  //   }
  //   return null;
  // };

  // getPackTickets = async (searchId, controller) => {
  //   try {
  //     const res = await this.getResource(
  //       '/tickets',
  //       `searchId=${searchId}`,
  //       controller,
  //     );
  //     const formatRes = ApiService.formatTickets(res);
  //     return formatRes;
  //   } catch (error) {
  //     if (error.status === 500) {
  //       return { tickets: [], stop: false, skip: true };
  //     }
  //     return { tickets: [], stop: false, skip: true, error: true };
  //   }
  // };
}

export const apiService = new ApiService();
