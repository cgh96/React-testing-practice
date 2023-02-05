import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOptions from './ScoopOptions';

const Options = ({optionType}) => {
  const [items, setItems] = useState([]);

  // optionType is 'sccops' or 'toppings'
  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (e) {
        // TODO: handle error response
      }
    }
    requestData();
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map(item => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ))

  return (
    <Row>
      {
        optionItems
      }
    </Row>
  )
}

export default Options;