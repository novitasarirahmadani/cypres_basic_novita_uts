describe('User Can Edit User', () => {
  afterEach(() => {
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed"
      );
});
  //before each test case 
  beforeEach(() => {
    //reset database using cypress command
    cy.exec(
      "cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed");
      //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit("http://localhost:8000/user-management/user");
  });

  //positive test case
  it('User can edit user baru', () => {
    cy.get('.table td').contains('userbaru').parent().find('a').contains('Edit').click();
    cy.get('#name').clear();
    cy.get('#name').type('user edited');
    cy.get('.btn-primary').contains('Submit').click();
    cy.get('.table td').contains('user edited').should('have.text', 'user edited');
    cy.get('.alert').should('be.visible')
      .and('have.class', 'alert-success')
      .and('contain', 'User Berhasil Diupdate');
  });
})