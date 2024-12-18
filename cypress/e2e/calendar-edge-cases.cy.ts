describe('Calendar Edge Cases', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('handles offline mode', () => {
    cy.intercept('GET', '**/api/tasks', { forceNetworkError: true }).as('getTasks');
    cy.reload();
    cy.contains('Error loading tasks').should('be.visible');
  });

  it('handles invalid date inputs', () => {
    cy.get('button').contains('Add Task').click();
    
    // Try to submit with invalid date
    cy.get('input[name="date"]').type('invalid date');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid date').should('be.visible');
  });

  it('prevents overlapping tasks', () => {
    // Create first task
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Task 1');
    cy.get('select[name="startHour"]').select('10');
    cy.get('select[name="endHour"]').select('11');
    cy.get('button[type="submit"]').click();

    // Try to create overlapping task
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Task 2');
    cy.get('select[name="startHour"]').select('10');
    cy.get('select[name="endHour"]').select('11');
    cy.get('button[type="submit"]').click();
    cy.contains('Time slot already booked').should('be.visible');
  });

  it('handles long task titles and descriptions', () => {
    const longTitle = 'A'.repeat(100);
    const longDescription = 'B'.repeat(500);

    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type(longTitle);
    cy.get('textarea[name="description"]').type(longDescription);
    cy.get('button[type="submit"]').click();

    // Verify text is truncated in calendar view
    cy.get('[data-testid="task-title"]')
      .should('have.css', 'text-overflow', 'ellipsis');
  });

  it('handles timezone changes', () => {
    // Mock timezone change
    cy.clock(new Date('2024-01-15T12:00:00').getTime());
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Timezone Test');
    cy.get('button[type="submit"]').click();

    // Verify task appears in correct time slot
    cy.contains('12:00').should('be.visible');
  });
});