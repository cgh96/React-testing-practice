import Button from "react-bootstrap/Button";
import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(Object.values(totals).reduce((scoop, topping) => scoop + topping, 0))}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
};

export default OrderEntry;
