import { useState } from "react";
import { Link } from "react-router-dom";

const ArticleItem = ({ article, id }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="card card-news">
      {(!imageError && (
        <img
          src={article?.urlToImage || "https://picsum.photos/200/300"}
          alt="Unable to load article image"
          className="article-image"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )) || (
        <img
          src={"https://picsum.photos/200/300"}
          alt="Unable to load article image"
          className="article-image"
        />
      )}
      <Link to={`/article/${id}`}>
        <h2>{article.title}</h2>
      </Link>
      <p>{article.description}</p>
      <p>Article By:{article.author}</p>
    </div>
  );
};

export default ArticleItem;
