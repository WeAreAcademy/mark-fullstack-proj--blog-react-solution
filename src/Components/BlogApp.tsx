import { useEffect, useState } from "react";
import { IArticle, IArticleDraft } from "../types";
import { ArticleForm } from "./ArticleForm";
import { ArticleList } from "./ArticleList";
import SingleArticle from "./SingleArticle";
import "./App.css";
import axios from "axios";
import apiBaseURL from "../api";

function BlogApp(): JSX.Element {
    const [articles, setArticles] = useState<IArticle[]>([]);

    const fetchAndStoreArticles = async () => {
        const response = await axios.get(apiBaseURL + "/articles");
        setArticles(response.data);
    };

    useEffect(() => {
        fetchAndStoreArticles();
    }, []);

    const handleClickOneArticle: (id: number) => void = (id: number) => {
        setFocusedId(id);
    };
    const handleClickListAll: () => void = () => {
        setFocusedId(null);
    };

    async function handleArticleSubmit(article: IArticleDraft) {
        const response = await axios.post(apiBaseURL + "/articles", article);
        if (response.status !== 201) {
            console.error("Error creating article: ", response.data);
            return false;
        }
        await fetchAndStoreArticles();
        return true;
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
                    <ArticleList {...{ articles, handleClickOneArticle }} />
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
