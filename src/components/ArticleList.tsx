import { IArticle } from "../types";
import { Article } from "./Article";

interface IArticleListProps {
    articles: IArticle[];
    handleClickOneArticle: (e: any) => void;
}
export function ArticleList(props: IArticleListProps): JSX.Element {
    return (
        <div className="articles">
            I will show all your articles. There are {props.articles.length}
            {props.articles.map((p) => (
                <Article
                    {...p}
                    handleClick={props.handleClickOneArticle}
                    key={p.id}
                />
            ))}
        </div>
    );
}
