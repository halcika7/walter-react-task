import { render, screen } from '@testing-library/react';
import ArticleCard from '@components/card';

const getArticle = (url = '') => (
  <ArticleCard
    description="description"
    onClick={jest.fn()}
    source="source"
    title="title"
    urlToImage={url}
  />
);

describe('Testing Article Card Component', () => {
  it('should render card without an image', () => {
    render(getArticle());

    const card = screen.getByTestId('article-card');

    expect(card).toBeTruthy();
    expect(screen.queryByTestId('article-card-image')).toBeNull();
  });

  it('should render card with an image', () => {
    render(
      getArticle(
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&psig=AOvVaw0oNwfoyyzUn-SZBc-Gs39R&ust=1615456763324000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPirr8a7pe8CFQAAAAAdAAAAABAD'
      )
    );

    const card = screen.getByTestId('article-card');
    const image = screen.getByTestId('article-card-image');

    expect(card).toBeTruthy();
    expect(image).toBeTruthy();
  });
});
