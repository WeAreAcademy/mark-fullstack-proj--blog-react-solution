import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import apiBaseURL from "../api";
import { IArticle, IArticleDraft } from "../types";
import { ArticleForm } from "./ArticleForm";
import { ArticleList } from "./ArticleList";
import SingleArticle from "./SingleArticle";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function BlogApp(): JSX.Element {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [focusedId, setFocusedId] = useState<number | null>(null);
    const [lastErrors, setLastErrors] = useState<string[]>([]);

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
        try {
            await axios.post(apiBaseURL + "/articles", article);
            setLastErrors([]);
            await fetchAndStoreArticles();
            return true;
        } catch (error) {
            const err = error as unknown as any;
            const validationErrors: string[] = getJoiErrorsFromAxiosError(err);
            setLastErrors(validationErrors);
            console.error("Error creating article: ", error);
            toast.error("Error " + validationErrors.join("\n"));
            return false;
        }
    }

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
                {lastErrors.map((e) => (
                    <div className="error">❌ {e}</div>
                ))}
                <ArticleForm onArticleSubmit={handleArticleSubmit} />
                {focusedId === null ? (
                    <ArticleList {...{ articles, handleClickOneArticle }} />
                ) : (
                    <SingleArticle id={focusedId} />
                )}
            </main>
            <footer>this is the footer</footer>
            <ToastContainer />
        </div>
    );
}

function getJoiErrorsFromAxiosError(err: any): string[] {
    return (
        err?.response?.data?.error?.details?.map((d: any) => d.message) ?? []
    );
}

export default BlogApp;
