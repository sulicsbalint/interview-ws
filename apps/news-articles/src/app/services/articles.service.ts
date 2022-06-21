import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ArticlesRequestParamaters, ArticlesResponse } from '../types/news-articles-types';

@Injectable({
	providedIn: 'root'
})
export class ArticlesService {

	private _apiKey: string = 'e53f7257fa8f49e1b55dabfca019dd11';
	private _apiUrl: string = 'https://newsapi.org/v2/everything';

	constructor(
		private readonly _http: HttpClient
	) { }

	getArticles(options?: ArticlesRequestParamaters): Observable<ArticlesResponse> {
		console.log(options);
		let queryParams = new HttpParams();
		queryParams = queryParams.append('apiKey', this._apiKey);
		queryParams = options?.q ? queryParams.append('q', options.q) : queryParams;
		queryParams = options?.from ? queryParams.append('from', options.from) : queryParams;
		queryParams = options?.to ? queryParams.append('to', options.to) : queryParams;

		return this._http.get<ArticlesResponse>(this._apiUrl, { params: queryParams });
	}
}
