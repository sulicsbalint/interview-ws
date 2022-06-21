describe('articles http request', () => {
	describe('valid request', () => {
		it('GET articles', () => {
			cy.request({
				method: 'GET',
				url: 'https://newsapi.org/v2/everything?apiKey=e53f7257fa8f49e1b55dabfca019dd11&q=star%20wars'
			}).then((response) => {
	
				expect(response.body.articles).to.exist;
			});
		});
	});

	describe('invalid request', () => {
		it('missing api key', () => {
			cy.request({
				method: 'GET',
				url: 'https://newsapi.org/v2/everything',
				failOnStatusCode: false
			}).then((response) => {
	
				expect(response.body.articles).not.to.exist;
				expect(response.status).to.equal(401);
				expect(response.body.code).to.equal('apiKeyMissing');
			});
		});

		it('missing paramter: q', () => {
			cy.request({
				method: 'GET',
				url: 'https://newsapi.org/v2/everything?apiKey=e53f7257fa8f49e1b55dabfca019dd11',
				failOnStatusCode: false
			}).then((response) => {
	
				expect(response.body.articles).not.to.exist;
				expect(response.status).to.equal(400);
				expect(response.body.code).to.equal('parametersMissing');
			});
		});
	});
});
