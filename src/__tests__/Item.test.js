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

describe("Item.isElementVerticallyInViewport", () => {
  let item;
  let baseElement;
  let percentInViewport;

  beforeEach(() => {
    item = new Item();
    global.innerHeight = 400;
    baseElement = document.createElement("li");
    percentInViewport = 0.25;
  });
  test("Item.isElementVerticallyInViewport with element above viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: -200,
        bottom: -100
      };
    });
    expect(
      item.isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("Item.isElementVerticallyInViewport with element below viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: 500,
        bottom: 600
      };
    });
    expect(
      item.isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("Item.isElementVerticallyInViewport with element completely inside viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 100,
        top: 100,
        bottom: 200
      };
    });
    expect(
      item.isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("Item.isElementVerticallyInViewport with element more than 25% inside viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 600,
        top: -100,
        bottom: 500
      };
    });
    expect(
      item.isElementVerticallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("Item.isElementVerticallyInViewport with element overlapping with viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 600,
        top: -100,
        bottom: 500
      };
    });
    expect(item.isElementVerticallyInViewport(baseElement, 1)).toBeFalsy();
  });
});
