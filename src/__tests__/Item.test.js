import React from "react";
import Item from "../Item";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

test("<Item/> without props", () => {
  console.error = jest.fn();
  render(<Item />);
  expect(console.error).toBeCalled();
  console.error.mockClear();
});
