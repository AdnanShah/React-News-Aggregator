import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchArticleByIdAsync } from "../store/slices/articlesSlice";

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article) {
      setLoading(true);
      dispatch(fetchArticleByIdAsync(id))
        .then((action) => {
          const fetchedArticle = action.payload;
          if (fetchedArticle) {
            setArticle(fetchedArticle);
          } else {
            setError("Article not found");
            navigate("/");
          }
        })
        .catch((err) => {
          setError(err.message);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, article, dispatch, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <main>
      <article>
        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} />
        )}
        <h1>{article.title}</h1>
        <p className="detail">
          <span>Source: {article?.source?.name}</span>
          <span>{article?.author}</span>
        </p>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Goto Original Article
        </a>
      </article>
    </main>
  );
};

export default ArticleDetail;
