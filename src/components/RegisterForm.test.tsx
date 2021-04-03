import userEvent from '@testing-library/user-event';

import { registerBuild, render, screen, waitFor } from '../testUtils';
import RegisterForm, { validations } from './RegisterForm';

test('submit register form', async () => {
  const handleSubmitSpy = jest
    .fn()
    .mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(resolve, Math.round(Math.random() * 1e3)),
        ),
    );
  const data = registerBuild();

  render(<RegisterForm onSubmit={handleSubmitSpy} />);

  userEvent.type(screen.getByLabelText(/Name/i), data.name);
  userEvent.type(screen.getByLabelText(/Email/i), data.email);
  userEvent.type(screen.getByLabelText(/Password/i), data.password);
  userEvent.click(screen.getByRole('button', { name: 'Register' }));

  await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

  expect(handleSubmitSpy).toHaveBeenCalledWith(data);
});

test('validate login form', async () => {
  const handleSubmitSpy = jest
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 750)),
    );
  const data = registerBuild({ traits: 'invalid' });

  render(<RegisterForm onSubmit={handleSubmitSpy} />);

  userEvent.click(screen.getByRole('button', { name: 'Register' }));

  await expect(
    screen.findByText(validations.name.required),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.email.required),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.password.required),
  ).resolves.toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/Name/i), data.name);
  userEvent.type(screen.getByLabelText(/Email/i), data.email);
  userEvent.type(screen.getByLabelText(/Password/i), data.password);

  await expect(
    screen.findByText(validations.name.minLength.message),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.email.pattern.message),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.password.minLength.message),
  ).resolves.toBeInTheDocument();

  expect(handleSubmitSpy).not.toHaveBeenCalled();
});
