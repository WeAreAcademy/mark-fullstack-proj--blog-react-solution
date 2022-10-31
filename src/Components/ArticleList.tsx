import { useEffect, useState } from "react";
import apiBaseURL from "../api";
import { IArticle } from "../types";
import { Article } from "./Article";

interface IArticleListProps {
    handleClickOneArticle: (e: any) => void;
}
export function ArticleList(props: IArticleListProps): JSX.Element {
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
}
