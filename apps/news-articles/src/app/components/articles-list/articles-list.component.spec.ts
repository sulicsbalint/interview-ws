import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Article } from '../../types/news-articles-types';
import { ArticlesListComponent } from './articles-list.component';

describe('ArticlesListComponent', () => {
	let component: ArticlesListComponent;
	let fixture: ComponentFixture<ArticlesListComponent>;
	const testArticles: Article[] = [
		{
			author: 'Test Author 1',
			content: 'Test content 1',
			description: 'Test description 1',
			publishedAt: 'Test description 1',
			source: {
				id: 'Test id 1',
				name: 'Test name 1'
			},
			title: 'Test description 1',
			url: 'Test description 1',
			urlToImage: 'Test description 1'
		},
		{
			author: 'Test Author 2',
			content: 'Test content 2',
			description: 'Test description 2',
			publishedAt: 'Test description 2',
			source: {
				id: 'Test id 2',
				name: 'Test name 2'
			},
			title: 'Test description 2',
			url: 'Test description 2',
			urlToImage: 'Test description 2'
		}
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ArticlesListComponent],
			imports: [
				HttpClientModule,
				FormsModule,
				ReactiveFormsModule,
				MatNativeDateModule,
				MatDatepickerModule,
				MatFormFieldModule,
				MatInputModule,
				MatSnackBarModule,
				BrowserAnimationsModule],
			providers: [DatePipe]
		}).compileComponents();

		fixture = TestBed.createComponent(ArticlesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		it('should create articlesSearchForm', () => {
			const expectedResult = {
				q: null,
				from: null,
				to: null
			};

			expect(component.articlesSearchForm.value).toEqual(expectedResult);
		});

		it('should create authorFilterForm', () => {
			const expectedResult = {
				value: null
			};

			expect(component.authorFilterForm.value).toEqual(expectedResult);
		});
	});

	describe('filterByAuthor', () => {
		describe('input is empty', () => {
			it('should return all articles', () => {
				component.articles = testArticles;
				component.filterByAuthor();
	
				expect(component.filteredArticles).toEqual(component.articles);
			});
		});

		describe('input is given', () => {
			describe('author is in the list', () => {
				it('should return array with filtered items', () => {
					const expectedResult = [
						{
							author: 'Test Author 1',
							content: 'Test content 1',
							description: 'Test description 1',
							publishedAt: 'Test description 1',
							source: {
								id: 'Test id 1',
								name: 'Test name 1'
							},
							title: 'Test description 1',
							url: 'Test description 1',
							urlToImage: 'Test description 1'
						}
					];
		
					component.articles = testArticles;
					component.authorFilterForm.controls['value'].setValue('1');
					component.filterByAuthor();
		
					expect(component.filteredArticles).toEqual(expectedResult);
				});
			});

			describe('author is in not the list', () => {
				it('should return an empty array', () => {
					const expectedResult: any = [];
		
					component.articles = testArticles;
					component.authorFilterForm.controls['value'].setValue('3');
					component.filterByAuthor();
		
					expect(component.filteredArticles).toEqual(expectedResult);
				});
			});
		});
	});

	describe('getPublishedDate', () => {
		it('should replace the letter T with a space and remove the letter Z', () => {
			const publishedAt = '2022-06-03T11:00:00Z';
			const expectedResult = '2022-06-03 11:00:00';

			expect(component.getPublishedDate(publishedAt)).toEqual(expectedResult);
		});
	});

	describe('transfromDate', () => {
		it('should transform a date type parameter to a string type date with a dash separating the numbers', () => {
			const date = new Date(2022, 5, 6);
			const expectedResult = '2022-06-06';

			expect(component.transfromDate(date)).toEqual(expectedResult);
		});
	});
});
