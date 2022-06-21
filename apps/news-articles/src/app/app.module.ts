import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

@NgModule({
	declarations: [
		AppComponent,
		NxWelcomeComponent,
		ArticlesListComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
        ReactiveFormsModule,
		MatButtonModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatInputModule,
		MatFormFieldModule,
		MatSliderModule,
		MatSnackBarModule
	],
	providers: [
		DatePipe
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
