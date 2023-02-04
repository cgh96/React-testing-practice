import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color and update", () => {
  render(<App />);

  // find and element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  // expect the background color to be red.
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  fireEvent.click(colorButton);

    // expect the background color to be blue
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
    expect(colorButton).toHaveTextContent('Change to MediumViolet Red');
});

test('initial conditions', () => {
  render(<App />)

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkboc starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('check Enabled or Disabled Button By CheckBox', () => {
  render(<App />);

  const checkBox = screen.getByRole('checkbox', { name: "Disable button" });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkBox);

  expect(checkBox).toBeChecked();
  expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" })

  fireEvent.click(checkBox);

  expect(colorButton).toBeEnabled();
  expect(checkBox).not.toBeChecked();
	expect(colorButton).toHaveStyle({ backgroundColor: "red" })
}) 


describe('spaces before camel-case capital letters', () => {
	test('Works for no inner capital letters', () => {
		expect(replaceCamelWithSpaces("Red")).toBe('Red');
	});
	test('Works for one inner capital letter', () => {
		expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});

	test('Works for multiple inner capital letters', () => {
		expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
	});
})