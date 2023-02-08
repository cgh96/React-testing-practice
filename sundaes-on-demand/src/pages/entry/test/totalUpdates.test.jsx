import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  const user = userEvent.setup();

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate soops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });
  const user = userEvent.setup();

  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const MMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(MMsInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotFudgeInput = await screen.findByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const user = userEvent.setup();

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const peanutButterCheckbox = await screen.findByRole("checkbox", { name: "Peanut butter cups" });
    await user.click(peanutButterCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
});
