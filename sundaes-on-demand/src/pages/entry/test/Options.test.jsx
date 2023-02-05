import { render, screen } from '@testing-library/react';

import Options from '../Options';
import ScoopOptions from '../ScoopOptions';

test('displays image for each scoop options from server', () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map(element => element.alt);
  expect(altText).toEqual(['Chocolate sccop', 'Vanilla scoop']);
})