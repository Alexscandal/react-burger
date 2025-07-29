describe('check modal works', () => {
	const modal = '[data-testid=modal]';
	it('should open modal', () => {
		cy.prepare();
		cy.get('[data-testid=main1]').click();
		cy.get('#react-modals')
			.as('openModal')
			.find('[data-testid=modal-header]')
			.contains('Детали ингредиента')
			.should('exist');
		cy.get('@openModal').find('h3').contains('Котлета').should('exist');
	});

	it('should close modal on button click', () => {
		cy.prepare();
		cy.get('[data-testid=main2]').click();
		cy.get('[data-testid=close-modal]').click({ force: true });
		cy.get(modal).should('not.exist');
	});

	it('should close modal on overlay click', () => {
		cy.prepare();
		cy.get('[data-testid=sauce1]').click();
		cy.get('[data-testid=overlay]').click({ force: true });
		cy.get(modal).should('not.exist');
	});
});
