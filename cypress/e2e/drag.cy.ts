describe('check dragging', () => {
	it('should grag bun', () => {
		cy.prepare();
		cy.get('[data-testid=bun1]').trigger('dragstart');
		cy.get('[data-testid=contructor]').trigger('drop');
	});

	it('should grag ingredient', () => {
		cy.prepare();
		cy.get('[data-testid=main1]').trigger('dragstart');
		cy.get('[data-testid=contructor]').trigger('drop');
	});
});
