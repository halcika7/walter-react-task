import { AppThunkDispatch } from '../AppThunkDispatch';
import { axios } from '../../lib/axios';
import { HomeActionTypes, ArticlesResponse, HomeActions } from '../types';

export const setArticles = (
  data: ArticlesResponse,
  more: boolean
): HomeActionTypes => ({
  type: !more ? HomeActions.SET_ARTICLES : HomeActions.LOAD_MORE,
  payload: data,
});

export const setMessage = (message = ''): HomeActionTypes => ({
  type: HomeActions.SET_MESSAGE,
  payload: { message },
});

const fetchArticles = (url: string, more: boolean) => async (
  dispatch: AppThunkDispatch
) => {
  try {
    const { data } = await axios.get<ArticlesResponse>(url);
    dispatch(setMessage());
    dispatch(setArticles(data, more));
  } catch (error) {
    dispatch(setArticles({ articles: null, totalResults: 0 }, false));
    dispatch(setMessage(error.response.data.message));
  }
};

export const fetchTopHeadlines = (page: number, loadMore = false) => (
  dispatch: AppThunkDispatch
) => {
  dispatch(fetchArticles(`/top-headlines?language=en&page=${page}`, loadMore));
};

export const searchArticles = (
  query: string,
  page: number,
  sort: string,
  loadMore = false
) => async (dispatch: AppThunkDispatch) => {
  let url = `/everything?q=${encodeURI(query)}&page=${page}`;

  if (sort) {
    url = `${url}&sortBy=${sort}`;
  }

  dispatch(fetchArticles(url, loadMore));
};
