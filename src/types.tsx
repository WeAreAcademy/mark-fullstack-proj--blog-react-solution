export interface IArticle extends IArticleDraft {
    id: number;
    date: string;
}

export interface IArticleDraft {
    title: string;
    prose: string;
}
