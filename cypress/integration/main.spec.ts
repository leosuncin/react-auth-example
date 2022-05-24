import { userBuild } from '../../src/testUtils';
import { AuthStorageEnum } from '../../src/types/AuthStorageEnum';

context('Unauthenticated', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('shows app title', () => {
    cy.findByRole('heading', { name: 'React App' }).should('be.visible');
    cy.findByText('Log out').should('not.exist');
  });

  it('shows tabs with form', () => {
    cy.findByRole('tab', { name: 'Register' }).should(
      'have.attr',
      'aria-selected',
      'true',
    );
    cy.findByRole('tab', { name: 'Login' }).should(
      'have.attr',
      'aria-selected',
      'false',
    );
    cy.findByTestId('register').should('be.visible');
    cy.findByTestId('login').should('not.be.visible');

    cy.findByRole('tab', { name: 'Login' }).click();

    cy.findByRole('tab', { name: 'Register' }).should(
      'have.attr',
      'aria-selected',
      'false',
    );
    cy.findByRole('tab', { name: 'Login' }).should(
      'have.attr',
      'aria-selected',
      'true',
    );
    cy.findByTestId('register').should('not.be.visible');
    cy.findByTestId('login').should('be.visible');
  });
});

context('Authenticated', () => {
  const user = userBuild({
    overrides: { name: 'Jane Doe', email: 'jane@doe.me' },
  });

  beforeEach(() => {
    cy.visit('/');
    const token = btoa(JSON.stringify(user));
    localStorage.setItem(AuthStorageEnum.token, token);
    localStorage.setItem(AuthStorageEnum.user, JSON.stringify(user));
  });

  it('show user details', () => {
    cy.findByRole('img', { name: user.name });
    cy.findByText(user.name);
  });

  it('log out', () => {
    cy.findByRole('button', { name: 'Log out' })
      .click()
      .should(() => {
        assert.isNull(localStorage.getItem(AuthStorageEnum.token));
        assert.isNull(localStorage.getItem(AuthStorageEnum.user));
      });
  });
});
