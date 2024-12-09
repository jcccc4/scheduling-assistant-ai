describe('Calendar Tasks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a new task with all details', () => {
    cy.get('[role="combobox"]').click();
    cy.contains('Daily').click();
    cy.get('[data-testid="daily-view"]').should('be.visible');
    // Set to weekly view
    cy.get('[role="combobox"]').click();
    cy.contains('Weekly').click();
    cy.get('[data-testid="weekly-view"]').should('be.visible')

    // Click on a time slot to open task form
    cy.get('[data-testid="weekly-view"]')
      .find('.hover\\:bg-slate-200')
      .first()
      .click();

    // Fill in task details
    cy.get('input[name="title"]').type('Important Meeting');
    cy.get('textarea[name="description"]').type('Discuss project milestones');
    
    // Submit the form
    cy.contains('button', 'Schedule').click();

    // Verify task appears on calendar
    cy.contains('Important Meeting').should('be.visible');
  });

  it('should navigate between weeks', () => {
    // Click next week button
    cy.get('button').contains('ChevronRight').click();
    
    // Verify date changed
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    cy.get('[data-testid="weekly-view"]').should('include.text', nextWeek.getDate().toString());

    // Click previous week button
    cy.get('button').contains('ChevronLeft').click();
    
    // Verify returned to current week
    const today = new Date();
    cy.get('[data-testid="weekly-view"]').should('include.text', today.getDate().toString());
  });

  it('should display task details correctly', () => {
    // Create a task
    cy.get('[data-testid="weekly-view"]')
      .find('.hover\\:bg-slate-200')
      .first()
      .click();

    const taskTitle = 'Test Task Details';
    const taskDesc = 'Test Description';

    cy.get('input[name="title"]').type(taskTitle);
    cy.get('textarea[name="description"]').type(taskDesc);
    cy.contains('button', 'Schedule').click();

    // Click on task to view details
    cy.contains(taskTitle).click();
    
    // Verify task details are displayed correctly
    cy.contains(taskTitle).should('be.visible');
    cy.contains(taskDesc).should('be.visible');
  });

  it('should switch between calendar views correctly', () => {
    // Test monthly view
    cy.get('[role="combobox"]').click();
    cy.contains('Monthly').click();
    cy.get('[data-testid="monthly-view"]').should('be.visible');
    cy.get('[data-testid="monthly-view"]').find('.grid-cols-7').should('exist');

    // Test weekly view
    cy.get('[role="combobox"]').click();
    cy.contains('Weekly').click();
    cy.get('[data-testid="weekly-view"]').should('be.visible');
    
    // Test daily view
    cy.get('[role="combobox"]').click();
    cy.contains('Daily').click();
    cy.get('[data-testid="daily-view"]').should('be.visible');
  });
});