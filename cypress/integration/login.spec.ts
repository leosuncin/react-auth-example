import { loginBuild, db } from '../../src/testUtils';
import { validations } from '../../src/components/LoginForm';

describe('Login form', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', (request) => {
      if (Cypress.env('env') === 'Preview') {
        return request.reply();
      }

      const { email } = request.body;
      const user = db.user.findFirst({ where: { email: { equals: email } } });
      const token = JSON.stringify(user);

      if (user) {
        request.reply(
          200,
          { ...user, id: Number(user.id) },
          { authorization: `Bearer ${token}` },
        );
      } else {
        request.reply(401, {
          error: 'Unauthorized',
          message: `There isn't any user with email: ${email}`,
          statusCode: 401,
        });
      }
    }).as('login');
    cy.visit('/');
    cy.findByRole('tab', { name: 'Login' }).click();
  });

  it('sign in with existing user', () => {
    cy.findByTestId('login').within(() => {
      cy.findByLabelText(/Email/i).type('john@doe.me');
      cy.findByLabelText(/Password/i).type('Pa$$w0rd');
      cy.findByRole('button', { name: 'Login' }).click();
    });

    cy.wait('@login');
    cy.findByText('John Doe');
  });

  it('validate the form', () => {
    const data = loginBuild({ traits: 'invalid' });

    cy.findByTestId('login').within(() => {
      cy.findByRole('button', { name: 'Login' }).click();

      cy.findByText(validations.email.required).should('be.visible');
      cy.findByText(validations.password.required).should('be.visible');

      cy.findByLabelText(/Email/i).type(data.email);
      cy.findByLabelText(/Password/i).type(data.password);

      cy.findByText(validations.email.pattern.message).should('be.visible');
      cy.findByText(validations.password.minLength.message).should(
        'be.visible',
      );

      cy.findByRole('button', { name: 'Login' }).click();
    });
  });

  it('show error message', () => {
    const data = loginBuild();

    cy.findByTestId('login').within(() => {
      cy.findByLabelText(/Email/i).type(data.email);
      cy.findByLabelText(/Password/i).type(data.password);
      cy.findByRole('button', { name: 'Login' }).click();
    });

    cy.wait('@login');
    cy.findByText(`There isn't any user with email: ${data.email}`);
  });
});
