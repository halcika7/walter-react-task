export const article = {
  author: 'author',
  content: 'content',
  description: 'description',
  publishedAt: 'published',
  title: 'title',
  url: 'url',
  urlToImage: 'url',
  source: { id: 'id', name: 'name' },
};

export const buildArticles = (numberOfArticles: number) =>
  new Array(numberOfArticles)
    .fill(article)
    .map((ar, index) => ({ ...ar, title: `title-${index}` }));
