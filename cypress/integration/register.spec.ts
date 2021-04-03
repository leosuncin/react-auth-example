import { registerBuild, userBuild } from '../../src/testUtils';
import { validations } from '../../src/components/RegisterForm';

describe('Register form', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/register', (request) => {
      const { name, email } = request.body;
      const user = userBuild({ overrides: { name, email } });
      const token = JSON.stringify(user);

      if (email === 'john@doe.me') {
        request.reply(422, {
          error: 'Unprocessable Entity',
          message: ['The email «john@doe.me» is already register.'],
          statusCode: 422,
        });
      } else {
        request.reply(201, user, { authorization: `Bearer ${token}` });
      }
    }).as('register');
    cy.visit('/');
  });

  it('create a new user', () => {
    const data = registerBuild();

    cy.findByTestId('register').within(() => {
      cy.findByLabelText(/Name/i).type(data.name);
      cy.findByLabelText(/Email/i).type(data.email);
      cy.findByLabelText(/Password/i).type(data.password);
      cy.findByRole('button', { name: 'Register' }).click();
    });

    cy.wait('@register');
    cy.findByText(data.name);
  });

  it('validate the form', () => {
    const data = registerBuild({ traits: 'invalid' });

    cy.findByTestId('register').within(() => {
      cy.findByRole('button', { name: 'Register' }).click();

      cy.findByText(validations.name.required).should('be.visible');
      cy.findByText(validations.email.required).should('be.visible');
      cy.findByText(validations.password.required).should('be.visible');

      cy.findByLabelText(/Name/i).type(data.name);
      cy.findByLabelText(/Email/i).type(data.email);
      cy.findByLabelText(/Password/i).type(data.password);

      cy.findByText(validations.name.minLength.message).should('be.visible');
      cy.findByText(validations.email.pattern.message).should('be.visible');
      cy.findByText(validations.password.minLength.message).should(
        'be.visible',
      );

      cy.findByRole('button', { name: 'Register' }).click();
    });
  });

  it('show error message', () => {
    const data = registerBuild({ overrides: { email: 'john@doe.me' } });

    cy.findByTestId('register').within(() => {
      cy.findByLabelText(/Name/i).type(data.name);
      cy.findByLabelText(/Email/i).type(data.email);
      cy.findByLabelText(/Password/i).type(data.password);
      cy.findByRole('button', { name: 'Register' }).click();
    });

    cy.wait('@register');
    cy.findByText('The email «john@doe.me» is already register.');
  });
});
