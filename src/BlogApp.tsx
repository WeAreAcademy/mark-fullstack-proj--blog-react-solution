import React, { useEffect, useState } from "react";
import apiBaseURL from "./api";
import "./App.css";
import SingleArticle from "./Components/SingleArticle";
import { IArticle } from "./types";

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


interface IArticleProps extends IArticle {
  handleClick: (id: number) => void;
}

interface IArticlesProps {
  handleClickOneArticle: (e: any) => void;
}

const Articles: React.FC<IArticlesProps> = (props) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const fetchAndStoreArticles = () => {
    fetch(`${apiBaseURL}/posts/`)
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

export default BlogApp;
