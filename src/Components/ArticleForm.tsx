import { useState } from "react";
import { IArticleDraft } from "../types";

interface IArticleFormProps {
    onArticleSubmit: (article: IArticleDraft) => void;
}
export function ArticleForm(props: IArticleFormProps): JSX.Element {
    const [title, setTitle] = useState("");
    const [prose, setProse] = useState("");

    function handleChangeTitle(text: string) {
        setTitle(text);
    }
    function handleChangeProse(text: string) {
        setProse(text);
    }
    function handleSubmitArticle() {
        const article: IArticleDraft = { title, prose };
        props.onArticleSubmit(article);
    }
    return (
        <div className="article">
            <h2>New Article</h2>
            <div className="formGrid">
                <label>Title: </label>
                <input
                    value={title}
                    onChange={(e) => handleChangeTitle(e.target.value)}
                />
                <label>Body: </label>
                <input
                    value={prose}
                    onChange={(e) => handleChangeProse(e.target.value)}
                />
            </div>
            <button onClick={handleSubmitArticle}>Submit!</button>
        </div>
    );
}
