// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from "@testing-library/react";
import App from "./App";

test("메모 앱이 렌더링된다", () => {
  render(<App />);
  expect(screen.getByText(/메모 앱/i)).toBeInTheDocument();
});
