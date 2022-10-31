import { IArticle } from "../types";

interface IArticleProps extends IArticle {
    handleClick: (id: number) => void;
}
export function Article({
    id,
    title,
    prose,
    date,
    handleClick,
}: IArticleProps): JSX.Element {
    return (
        <div className="article">
            <h2 onClick={() => handleClick(id)}>{title}</h2>
            <div>{prose}</div>
            <div>Written on {date}</div>
        </div>
    );
}
