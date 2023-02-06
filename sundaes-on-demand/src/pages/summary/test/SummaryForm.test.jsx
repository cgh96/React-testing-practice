import { render, screen } from "@testing-library/react"
import SummaryForm from "../SummaryForm"
import userEvent from "@testing-library/user-event"

test("checking checkbox enables button", async () => {
  render(<SummaryForm />)
  const user = userEvent.setup()

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  const confirmButton = screen.getByRole("button", { name: "Confirm order" })
  expect(checkBox).not.toBeChecked()
  expect(confirmButton).toBeDisabled()

  await user.click(checkBox)
  expect(checkBox).toBeChecked()
  expect(confirmButton).toBeEnabled()
})

test("popover responds to hover", async () => {
  const user = userEvent.setup()
  render(<SummaryForm />)

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  )
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})
