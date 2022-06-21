export interface ArticlesResponse {
	status: string;
	totalResults: number;
	articles: Article[];
}

export interface Article {
	author: string;
	content: string;
	description: string;
	publishedAt: string;
	source: ArticleSource
	title: string;
	url: string;
	urlToImage: string;
}

export interface ArticleSource {
	id: string;
	name: string;
}

export interface ArticlesRequestParamaters {
	q?: string;
	from?: string;
	to?: string;
}
