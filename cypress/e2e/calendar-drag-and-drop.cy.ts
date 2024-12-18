describe('Calendar Drag and Drop', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('allows dragging tasks to different times', () => {
    // Create a task first
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Draggable Task');
    cy.get('button[type="submit"]').click();

    // Drag task to new time slot
    cy.get('[data-testid="task-item"]')
      .trigger('mousedown')
      .trigger('mousemove', { clientX: 100, clientY: 200 })
      .trigger('mouseup');

    // Verify task moved
    cy.get('[data-testid="task-item"]')
      .should('have.attr', 'data-hour')
      .and('not.equal', '10');
  });

  it('prevents dragging outside calendar bounds', () => {
    // Create a task
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Bounded Task');
    cy.get('button[type="submit"]').click();

    // Try to drag outside calendar
    cy.get('[data-testid="task-item"]')
      .trigger('mousedown')
      .trigger('mousemove', { clientX: -100, clientY: -100 })
      .trigger('mouseup');

    // Verify task stayed within bounds
    cy.get('[data-testid="task-item"]')
      .should('be.visible')
      .and('have.css', 'position', 'absolute');
  });

  it('handles task resizing', () => {
    // Create a task
    cy.get('button').contains('Add Task').click();
    cy.get('input[name="title"]').type('Resizable Task');
    cy.get('button[type="submit"]').click();

    // Resize task
    cy.get('[data-testid="task-resize-handle"]')
      .trigger('mousedown')
      .trigger('mousemove', { clientY: 100 })
      .trigger('mouseup');

    // Verify task height changed
    cy.get('[data-testid="task-item"]')
      .invoke('height')
      .should('be.gt', 60);
  });
});