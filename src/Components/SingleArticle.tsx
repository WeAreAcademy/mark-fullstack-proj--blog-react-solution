import { useEffect, useState } from "react";
import apiBaseURL from "../api";
import { IArticle } from "../types";

interface ISingleArticleProps {
    id: number;
}
interface IComment {
    id: number;
    article_id: number;
    prose: string;
    date: string;
}
type DeleteHandler = (comment: IComment) => Promise<void>;
interface ICommentProps {
    comment: IComment;
    handleDeleteComment: DeleteHandler;
}

const SingleArticle: React.FC<ISingleArticleProps> = ({ id }) => {
    const [article, setArticle] = useState<IArticle | null>(null);
    const [comments, setComments] = useState<IComment[]>([]);

    const handleDeleteComment: DeleteHandler = async (comment: IComment) => {
        const url = apiBaseURL + `/articles/${comment.article_id}/comments/${comment.id}`;
        await fetch(url, { method: 'DELETE' });
    }

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
                        <Comment comment={c} handleDeleteComment={handleDeleteComment} key={c.id} />
                    ))}
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

const Comment: React.FC<ICommentProps> = ({ comment, handleDeleteComment }) => (
    <div className="comment">
        <div className="comment-header">Comment by anonymous at {comment.date}</div>
        <div className="comment-prose">{comment.prose}</div>
        <span onClick={() => handleDeleteComment(comment)}>delete</span>
    </div>
);

export default SingleArticle;