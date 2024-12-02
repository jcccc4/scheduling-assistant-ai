describe('Calendar Application', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the calendar component', () => {
      // Test basic page load
      cy.get('body').should('be.visible');
      cy.contains('Today').should('exist');
    });
  
    it('should switch between calendar views', () => {
      // Test view switching
      cy.get('[role="combobox"]').click();
      cy.contains('Monthly').click();
      cy.get('[data-testid="monthly-view"]').should('be.visible');
  
      cy.get('[role="combobox"]').click();
      cy.contains('Weekly').click();
      cy.get('[data-testid="weekly-view"]').should('be.visible');
    });
  
    it('should create a new task', () => {
      // Test task creation
      cy.contains('Schedule Appointment').click();
  
      // Fill in the form
      cy.get('input[name="title"]').type('Test Task');
      
      // Select date
      cy.get('[aria-label="Pick a date"]').click();
      cy.get('.calendar').contains('15').click();
      
      // Add description
      cy.get('textarea[name="description"]').type('Test Description');
      
      // Submit
      cy.contains('button', 'Schedule Appointment').click();
      
      // Verify task was created
      cy.contains('Test Task').should('be.visible');
    });
  
    it('should validate required fields', () => {
      cy.contains('Schedule Appointment').click();
      
      // Try to submit empty form
      cy.contains('button', 'Schedule Appointment').click();
      
      // Check for validation messages
      cy.contains('Title is required').should('be.visible');
    });
  });
  