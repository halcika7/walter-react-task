import { combineReducers, Reducer } from 'redux';
import { HomeActionTypes, HomeActions, HomeState, Article } from '../types';

export const INITIAL_STATE: HomeState = {
  articles: null,
  totalResults: 0,
  message: '',
};

export function HomeReducer(
  prevState = INITIAL_STATE,
  action: HomeActionTypes
) {
  switch (action.type) {
    case HomeActions.SET_ARTICLES:
      return {
        ...prevState,
        articles: action.payload.articles,
        totalResults: action.payload.totalResults,
      };
    case HomeActions.LOAD_MORE:
      return {
        ...prevState,
        articles: [
          ...(prevState.articles as Article[]),
          ...(action.payload.articles as Article[]),
        ],
      };
    case HomeActions.SET_MESSAGE:
      return { ...prevState, message: action.payload.message };
    default:
      return prevState;
  }
}

export interface AppState {
  home: HomeState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  home: HomeReducer,
});
