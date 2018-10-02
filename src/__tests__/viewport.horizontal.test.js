import { isElementHorizontallyInViewport } from "../viewport";

describe("isElementHorizontallyInViewport", () => {
  let baseElement;
  let percentInViewport;

  beforeEach(() => {
    global.innerWidth = 400;
    baseElement = document.createElement("li");
    percentInViewport = 0.25;
  });
  test("isElementHorizontallyInViewport with element left to viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        left: -200,
        right: -100
      };
    });
    expect(
      isElementHorizontallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("isElementHorizontallyInViewport with element right to viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        left: 500,
        right: 600
      };
    });
    expect(
      isElementHorizontallyInViewport(baseElement, percentInViewport)
    ).toBeFalsy();
  });

  test("isElementHorizontallyInViewport with element completely inside of viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        left: 100,
        right: 300
      };
    });
    expect(
      isElementHorizontallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("isElementHorizontallyInViewport with element more than 25% inside viewport returns true", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 600,
        left: -100,
        right: 500
      };
    });
    expect(
      isElementHorizontallyInViewport(baseElement, percentInViewport)
    ).toBeTruthy();
  });

  test("isElementHorizontallyInViewport with element overlapping with viewport returns false", () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 600,
        left: -100,
        right: 500
      };
    });
    expect(isElementHorizontallyInViewport(baseElement, 1)).toBeFalsy();
  });
});
