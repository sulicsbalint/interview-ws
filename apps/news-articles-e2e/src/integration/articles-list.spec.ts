describe('articles-list', () => {
	beforeEach(() => cy.visit('/'));

	it('should display title for form', () => {
		cy.get('h1').contains('Search for articles');
	});

	describe('searching with keyword', () => {
		it('should complete search', () => {
			cy.get('input').first().type('star wars');
			cy.get('.mat-raised-button').contains('Search').click();
		});
	});

	describe('searching without keyword', () => {
		it('should display error message', () => {
			cy.get('.mat-raised-button').contains('Search').click();
			cy.get('.mat-snack-bar-container').contains('Required parameters are missing');
		});
	});
});
