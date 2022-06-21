import { DatePipe } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ArticlesService } from '../../services/articles.service';
import { Article, ArticlesRequestParamaters, ArticlesResponse } from '../../types/news-articles-types';

@Component({
	selector: 'interview-ws-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {

	articlesSearchForm: FormGroup = new FormGroup({});
	authorFilterForm: FormGroup = new FormGroup({});
	articles: Article[] = [];
	filteredArticles: Article[] = [];
	waitingForResponse: boolean = false;


	get anyArticles(): boolean {
		return this.articles.length !== 0;
	}

	constructor(
		private readonly _datepipe: DatePipe,
		private readonly _snackBar: MatSnackBar,
		private readonly _articlesService: ArticlesService
	) { }

	ngOnInit(): void {
		this.articlesSearchForm = new FormGroup({
			q: new FormControl(null),
			from: new FormControl(null),
			to: new FormControl(null)
		});

		this.authorFilterForm = new FormGroup({
			value: new FormControl(null)
		});
	}

	searchForArticles(): void {
		this.waitingForResponse = true;
		const requestParams: ArticlesRequestParamaters = {
			q: this.articlesSearchForm.value.q,
			from: this.transfromDate(this.articlesSearchForm.value.from as Date) ?? undefined,
			to: this.transfromDate(this.articlesSearchForm.value.to as Date) ?? undefined
		};

		this._articlesService.getArticles(requestParams)
			.subscribe({
				next: (response: ArticlesResponse) => {
					this.articles = response.articles;
					this.filteredArticles = response.articles;
				},
				error: (error: HttpErrorResponse) => {
					this._snackBar.open(error.error.message, 'OK', { duration: 3000 });
					this.waitingForResponse = false;
				},
				complete: () => {
					this.waitingForResponse = false;
				}
			});
	}

	filterByAuthor(): void {
		const filterCondition = this.authorFilterForm.value.value;
		this.filteredArticles = this.articles.filter((article) => {
			if (!filterCondition) {
				return true;
			}

			if (article.author) {
				return article.author.toLowerCase().includes(filterCondition.toLowerCase());
			}
			
			return false;
		});
	}

	getPublishedDate(date: string): string {
		if (date) {
			const dateTime = date.split('T');
			return `${dateTime[0]} ${dateTime[1].replace('Z', '')}`;
		}

		return '';
	}

	transfromDate(date: Date): string | null {
		return this._datepipe.transform(date, 'yyyy-MM-dd');
	}
}
