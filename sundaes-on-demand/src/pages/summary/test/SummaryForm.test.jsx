import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test("checking checkbox enables button", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();


  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(confirmButton).toBeEnabled();

});