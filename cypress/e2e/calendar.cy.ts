describe('Calendar Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the calendar component', () => {
    cy.get('body').should('be.visible');
    cy.contains('Today').should('exist');
  });

  it('should switch between calendar views', () => {
    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="monthly"]').click();
    cy.get('[data-testid="monthly-view"]').should('be.visible');

    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="weekly"]').click();
    cy.get('[data-testid="weekly-view"]').should('be.visible');

    cy.get('[data-testid="view-selector"]').click();
    cy.get('[data-value="daily"]').click();
    cy.get('[data-testid="daily-view"]').should('be.visible');
  });

  it('should create a new task', () => {
    cy.get('button').contains('Add Task').click();

    cy.get('input[name="title"]').type('Test Task');
    cy.get('textarea[name="description"]').type('Test Description');
    
    // Select date
    cy.get('[aria-label="Choose date"]').click();
    cy.get('.rdp-day').not('.rdp-day_disabled').first().click();

    // Select time
    cy.get('select[name="startHour"]').select('10');
    cy.get('select[name="startMinute"]').select('00');
    cy.get('select[name="endHour"]').select('11');
    cy.get('select[name="endMinute"]').select('00');

    cy.get('button[type="submit"]').click();
    cy.contains('Test Task').should('be.visible');
  });

  it('should validate required fields', () => {
    cy.get('button').contains('Add Task').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Title is required').should('be.visible');
  });
});