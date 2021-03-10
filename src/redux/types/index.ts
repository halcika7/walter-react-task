export enum HomeActions {
  SET_ARTICLES = '@@HOME/SET_ARTICLES',
  SET_ARTICLE = '@@HOME/SET_ARTICLE',
  LOAD_MORE = '@@HOME/LOAD_MORE',
  SET_MESSAGE = '@@HOME/SET_MESSAGE',
}

export interface Article {
  author: string;
  content: string | null;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string | null;
  source: { id: string; name: string };
}

export interface ArticlesResponse {
  articles: Article[] | null;
  totalResults: number;
}

export interface HomeState {
  articles: Article[] | null;
  totalResults: number;
  message: string;
}

interface SetArticles {
  type: typeof HomeActions.SET_ARTICLES;
  payload: ArticlesResponse;
}

interface SetArticle {
  type: typeof HomeActions.SET_ARTICLE;
  payload: Article;
}

interface LoadMore {
  type: typeof HomeActions.LOAD_MORE;
  payload: ArticlesResponse;
}

interface SetMessage {
  type: typeof HomeActions.SET_MESSAGE;
  payload: { message: string };
}

export type HomeActionTypes = SetArticles | SetArticle | LoadMore | SetMessage;
