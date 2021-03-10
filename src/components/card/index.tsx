import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

interface Props {
  description: string;
  title: string;
  urlToImage: string | null;
  source: string;
  onClick: () => void;
}

const ArticleCard: FC<Props> = ({
  description,
  title,
  urlToImage,
  onClick,
}) => (
  <Card className="h-100 w-100" data-testid="article-card">
    {urlToImage && (
      <Card.Img
        variant="top"
        src={urlToImage}
        data-testid="article-card-image"
        loading="lazy"
        decoding="async"
        alt={title}
      />
    )}
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer className="bg-transparent">
      <Button
        variant="primary"
        className="mt-auto w-100"
        onClick={onClick}
        data-testid="article-button"
      >
        READ FULL ARTICLE
      </Button>
    </Card.Footer>
  </Card>
);

export default ArticleCard;
