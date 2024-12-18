describe('Calendar Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between different calendar views', () => {
    // Test daily view
    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="daily"]').click();
    cy.get('[data-testid="daily-view"]').should('be.visible');

    // Test weekly view
    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="weekly"]').click();
    cy.get('[data-testid="weekly-view"]').should('be.visible');

    // Test monthly view
    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="monthly"]').click();
    cy.get('[data-testid="monthly-view"]').should('be.visible');
  });

  it('should navigate between dates', () => {
    cy.get('[data-testid="date-navigator-next"]').click();
    cy.get('[data-testid="date-navigator-prev"]').click();
    cy.get('[data-testid="date-navigator-today"]').click();
  });
});