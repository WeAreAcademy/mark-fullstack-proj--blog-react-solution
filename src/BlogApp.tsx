import React, { useEffect, useState } from "react";
import "./App.css";

function BlogApp() {
  const handleClickOneArticle: (id: number) => void = (id: number) => {
    setFocusedId(id);
  };
  const handleClickListAll: () => void = () => {
    setFocusedId(null);
  };

  const [focusedId, setFocusedId] = useState<number | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        {focusedId !== null && (
          <div className="listAll" onClick={handleClickListAll}>
            See all articles
          </div>
        )}
      </header>
      <main>
        {focusedId === null ? (
          <Articles {...{ handleClickOneArticle }} />
        ) : (
          <SingleArticle id={focusedId} />
        )}
      </main>
      <footer>this is the footer</footer>
    </div>
  );
}
//TODO: (go to origin server and proxy?)
console.assert(process.env.REACT_APP_API_BASE, "Need api base env var");
const apiBaseURL = process.env.REACT_APP_API_BASE;

interface IArticle {
  id: number;
  title: string;
  prose: string;
  date: string;
}
interface IArticleProps extends IArticle {
  handleClick: (id: number) => void;
}

interface IArticlesProps {
  handleClickOneArticle: (e: any) => void;
}

const Articles: React.FC<IArticlesProps> = (props) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const fetchAndStoreArticles = () => {
    fetch(`${apiBaseURL}/articles/`)
      .then((res) => res.json())
      .then((json) => setArticles(json));
  };

  useEffect(fetchAndStoreArticles, []);
  return (
    <div className="articles">
      I will show all your articles. There are {articles.length}
      {articles.map((p) => (
        <Article
          {...p}
          handleClick={props.handleClickOneArticle}
          key={p.id}
        />
      ))}
    </div>
  );
};

const Article: React.FC<IArticleProps> = ({
  id,
  title,
  prose,
  date,
  handleClick,
}) => {
  return (
    <div className="article">
      <h2 onClick={() => handleClick(id)}>{title}</h2>
      <div>{prose}</div>
      <div>Written on {date}</div>
    </div>
  );
};

interface ISingleArticleProps {
  id: number;
}
interface IComment {
  id: number;
  article_id: number;
  prose: string;
  date: string;
}

interface ICommentProps extends IComment { }

const SingleArticle: React.FC<ISingleArticleProps> = ({ id }) => {
  const [article, setArticle] = useState<IArticle | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);


  useEffect(() => {

    const fetchAndStoreArticle = async () => {
      const res = await fetch(apiBaseURL + `/articles/${id}`);
      const json = await res.json();
      setArticle(json);
    };

    const fetchAndStoreComments = async () => {
      const res = await fetch(apiBaseURL + `/articles/${id}/comments`);
      const json = await res.json();
      setComments(json);
    };

    fetchAndStoreComments();
    fetchAndStoreArticle();
  }, [id]);
  if (article !== null && comments !== null) {
    return (
      <div className="article">
        <h2>{article.title}</h2>
        <div>{article.prose}</div>
        <div>Written on {article.date}</div>
        <div className="commentsList">
          {comments.map((c) => (
            <Comment {...c} key={c.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const Comment: React.FC<ICommentProps> = ({ prose, date }) => (
  <div className="comment">
    <div className="comment-header">Comment by anonymous at {date}</div>
    <div className="comment-prose">{prose}</div>
  </div>
);

export default BlogApp;
