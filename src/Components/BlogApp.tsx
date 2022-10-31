import { useState } from "react";
import { IArticleDraft } from "../types";
import { ArticleForm } from "./ArticleForm";
import { ArticleList } from "./ArticleList";
import SingleArticle from "./SingleArticle";
import "./App.css";

function BlogApp(): JSX.Element {
    const handleClickOneArticle: (id: number) => void = (id: number) => {
        setFocusedId(id);
    };
    const handleClickListAll: () => void = () => {
        setFocusedId(null);
    };

    function handleArticleSubmit(article: IArticleDraft) {
        console.log("submitting article", article);
    }
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
                    <ArticleList {...{ handleClickOneArticle }} />
                ) : (
                    <SingleArticle id={focusedId} />
                )}
                <ArticleForm onArticleSubmit={handleArticleSubmit} />
            </main>
            <footer>this is the footer</footer>
        </div>
    );
}

export default BlogApp;
