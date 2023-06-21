/**
 * it should display page correclty
 * it should navigate to main map when button that contains Back to main map is clicked
 */
describe('Map Setting', () => {
  it('Should display page correctly', () => {
    cy.visit('http://localhost:3500/map-setting');
  });
});
